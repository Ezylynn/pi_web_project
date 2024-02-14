exports.up = pgm => {
    // Create users table
    pgm.createType('user_role', ['student', 'teacher', 'superadmin']);

    // Create users table
    pgm.createTable('users', {
      user_id: { type: 'serial', primaryKey: true },
      username: { type: 'varchar(255)', unique: true, notNull: true },
      password_hash: { type: 'varchar(255)', notNull: true },
      role: { 
        type: 'user_role', 
        notNull: true 
      },
      created_at: { type: 'timestamp', default: pgm.func('current_timestamp') }
    });
  
    // Create students_info table
    pgm.createTable('students_info', {
      student_id: { type: 'integer', primaryKey: true, references: 'users(user_id)' },
      full_name: { type: 'varchar(255)', notNull: true },
      email: { type: 'varchar(255)', unique: true, notNull: true },
      class: { type: 'varchar(50)' }
    });
  
    // Create teachers_info table
    pgm.createTable('teachers_info', {
      teacher_id: { type: 'integer', primaryKey: true, references: 'users(user_id)' },
      full_name: { type: 'varchar(255)', notNull: true },
      email: { type: 'varchar(255)', unique: true, notNull: true }
    });
  
    // Create pi_tests table
    pgm.createTable('pi_tests', {
      test_id: { type: 'serial', primaryKey: true },
      test_code: { type: 'varchar(50)', unique: true, notNull: true },
      description: { type: 'text' },
      start_time: { type: 'timestamp' },
      end_time: { type: 'timestamp' }
    });
  
    // Create test_results table
    pgm.createTable('test_results', {
      result_id: { type: 'serial', primaryKey: true },
      student_id: { type: 'integer', notNull: true, references: 'users(user_id)' },
      test_id: { type: 'integer', notNull: true, references: 'pi_tests(test_id)' },
      score: { type: 'integer' },
      attempt_time: { type: 'timestamp', default: pgm.func('current_timestamp') }
    });
  
    // Create student_teacher table
    pgm.createTable('student_teacher', {
      student_id: { type: 'integer', notNull: true, references: 'users(user_id)' },
      teacher_id: { type: 'integer', notNull: true, references: 'users(user_id)' }
    }, {
      constraints: {
        primaryKey: ['student_id', 'teacher_id']
      }
    });
  };
  
  exports.down = pgm => {
    // Drop tables in reverse order of creation
    pgm.dropTable('student_teacher');
    pgm.dropTable('test_results');
    pgm.dropTable('pi_tests');
    pgm.dropTable('teachers_info');
    pgm.dropTable('students_info');
    pgm.dropTable('users');
    pgm.dropType('user_role');
  };
