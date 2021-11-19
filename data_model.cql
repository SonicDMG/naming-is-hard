CREATE TABLE IF NOT EXISTS naming_is_hard.stats_by_function (
    function_name TEXT,
    timestamp TIMEUUID,
    data_center TEXT,
    elapsed_time INT,
    description TEXT STATIC,
    PRIMARY KEY ((function_name), timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC);

CREATE CUSTOM INDEX elapsed_time_sai_idx ON naming_is_hard.stats_by_function (elapsed_time) 
USING 'StorageAttachedIndex';

CREATE CUSTOM INDEX data_center_sai_idx ON naming_is_hard.stats_by_function (data_center) 
USING 'StorageAttachedIndex';

CREATE TABLE IF NOT EXISTS naming_is_hard.sentence_by_id (
    id UUID,
    num_words INT,
    sentence TEXT,
    PRIMARY KEY (id)
);