/* eslint-disable camelcase */

exports.shorthands = undefined;

/* eslint-disable camelcase */



exports.up = pgm => {
    
    pgm.createType('user_role', ['student', 'teacher', 'superadmin']);

    
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
  
   
    pgm.createTable('students_info', {
      student_id: { type: 'integer', primaryKey: true, references: 'users(user_id)', onDelete: 'CASCADE'},
      full_name: { type: 'varchar(255)', notNull: true },
      email: { type: 'varchar(255)', unique: true, notNull: true },
      grade: { type: 'varchar(50)' }
    });
  
    
    pgm.createTable('teachers_info', {
      teacher_id: { type: 'integer', primaryKey: true, references: 'users(user_id)', onDelete: 'CASCADE'},
      full_name: { type: 'varchar(255)', notNull: true },
      email: { type: 'varchar(255)', unique: true, notNull: true }
    });
  
   
    pgm.createTable('pi_tests', {
      test_id: { type: 'serial', primaryKey: true },
      encrypted_test_code: { type: 'varchar(50)', unique: true, notNull: true },
      test_date: {type: 'date'},
      test_name: { type: 'text' },
      start_time: { type: 'timestamp' },
      end_time: { type: 'timestamp' }
    });
  
    
    pgm.createTable('test_results', {
      result_id: { type: 'serial', primaryKey: true },
      student_id: { type: 'integer', notNull: true, references: 'users(user_id)' },
      test_id: { type: 'integer', notNull: true, references: 'pi_tests(test_id)' },
      answer: { type: 'text' },
      status: {type: 'varchar(10)'},
      attempt_time: { type: 'timestamp', default: pgm.func('current_timestamp') },
      attempted_at: { type: 'timestamp', default: pgm.func('current_timestamp')}
    });
  
   
    
  };
  
  exports.down = pgm => {
    
    pgm.dropTable('test_results');
    pgm.dropTable('pi_tests');
    pgm.dropTable('teachers_info');
    pgm.dropTable('students_info');
    pgm.dropTable('users');
    pgm.dropType('user_role');
  };