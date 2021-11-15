INSERT INTO naming_is_hard.stats_by_function (function_name, timestamp, data_center, elapsed_time, description) 
VALUES ('get_stats', NOW(), 'dc1', 36, 'description');

SELECT dateOf(timestamp) FROM naming_is_hard.stats_by_function;

SELECT avg(elapsed_time) FROM naming_is_hard.stats_by_function where function_name = 'get_stats';