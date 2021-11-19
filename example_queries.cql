INSERT INTO naming_is_hard.stats_by_function (function_name, timestamp, data_center, elapsed_time, description) 
VALUES ('get_stats', NOW(), 'dc1', 36, 'description');

SELECT dateOf(timestamp) FROM naming_is_hard.stats_by_function;

SELECT avg(elapsed_time) FROM naming_is_hard.stats_by_function where function_name = 'get_stats';


INSERT INTO naming_is_hard.sentence_by_id (id, num_words, sentence) 
VALUES (UUID(), 22, 'One DB to rule them all, one DB to find them, one DB to bring them all and in Cassandra bind them');

INSERT INTO naming_is_hard.sentence_by_id (id, num_words, sentence) 
VALUES (UUID(), 8, 'Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo');

INSERT INTO naming_is_hard.sentence_by_id (id, num_words, sentence) 
VALUES (UUID(), 8, 'To understand recursion, one must first understand recursion');

INSERT INTO naming_is_hard.sentence_by_id (id, num_words, sentence) 
VALUES (UUID(), 7, 'That is one big pile of .sh');

INSERT INTO naming_is_hard.sentence_by_id (id, num_words, sentence) 
VALUES (UUID(), 13, 'There''s some good in this code, Mr. Frodo and it''s worth fighting for.');

INSERT INTO naming_is_hard.sentence_by_id (id, num_words, sentence) 
VALUES (UUID(), 9, 'To boldly go where no app has gone before');