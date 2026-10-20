-- Esquema de Mi Horario (SQLite + SQLCipher).
-- Las columnas *_enc guardan JSON/texto cifrado con AES-256-GCM (ver security/crypto.js).
-- Las fechas son milisegundos desde epoch (UTC). Solo quedan en claro los datos
-- necesarios para ordenar y filtrar (fechas, día de la semana, estado completado).

CREATE TABLE IF NOT EXISTS users (
  id                  INTEGER PRIMARY KEY,
  public_id           TEXT    NOT NULL UNIQUE,
  email_index         TEXT    NOT NULL UNIQUE,      -- HMAC-SHA256 del correo normalizado
  email_enc           TEXT    NOT NULL,
  name_enc            TEXT,
  password_hash       TEXT    NOT NULL,             -- bcrypt
  failed_logins       INTEGER NOT NULL DEFAULT 0,
  locked_until        INTEGER,
  password_changed_at INTEGER NOT NULL,
  created_at          INTEGER NOT NULL,
  updated_at          INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  id_hash             TEXT    PRIMARY KEY,          -- SHA-256 del token de la cookie (el token nunca se guarda)
  user_id             INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  csrf_token          TEXT    NOT NULL,
  user_agent_enc      TEXT,
  created_at          INTEGER NOT NULL,
  last_seen_at        INTEGER NOT NULL,
  expires_at          INTEGER NOT NULL,             -- expiración por inactividad (se desliza)
  absolute_expires_at INTEGER NOT NULL              -- límite duro
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

CREATE TABLE IF NOT EXISTS classes (
  id         INTEGER PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  weekday    INTEGER NOT NULL CHECK (weekday BETWEEN 0 AND 6),   -- 0 = domingo … 6 = sábado
  start_min  INTEGER NOT NULL CHECK (start_min BETWEEN 0 AND 1439),
  end_min    INTEGER NOT NULL CHECK (end_min BETWEEN 1 AND 1440),
  data_enc   TEXT    NOT NULL,                                    -- {subject, room, color}
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  CHECK (end_min > start_min)
);
CREATE INDEX IF NOT EXISTS idx_classes_user ON classes(user_id, weekday, start_min);

CREATE TABLE IF NOT EXISTS exams (
  id         INTEGER PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  starts_at  INTEGER NOT NULL,
  ends_at    INTEGER NOT NULL,
  data_enc   TEXT    NOT NULL,                                    -- {subject, room, color, notes}
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  CHECK (ends_at > starts_at)
);
CREATE INDEX IF NOT EXISTS idx_exams_user ON exams(user_id, starts_at);

CREATE TABLE IF NOT EXISTS tasks (
  id           INTEGER PRIMARY KEY,
  user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind         TEXT    NOT NULL CHECK (kind IN ('moodle', 'aleks', 'otra')),
  opens_at     INTEGER NOT NULL,
  due_at       INTEGER NOT NULL,
  final_due_at INTEGER,                                           -- plazo extra (ALEKS)
  completed_at INTEGER,
  data_enc     TEXT    NOT NULL,                                  -- {subject, title, color, link}
  created_at   INTEGER NOT NULL,
  updated_at   INTEGER NOT NULL,
  CHECK (due_at >= opens_at)
);
CREATE INDEX IF NOT EXISTS idx_tasks_user ON tasks(user_id, due_at);

-- Datos varios por usuario guardados como JSON cifrado: prefs, grades, absences, notes, links, pomodoro.
CREATE TABLE IF NOT EXISTS user_data (
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  key        TEXT    NOT NULL,
  value_enc  TEXT    NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, key)
);
