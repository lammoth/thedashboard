select the_day, the_hour, avg(the_quantity) from (select day(ts) as the_day, hour(ts) as the_hour, count(quantity) as the_quantity from t_1 where ts >= DATE_SUB(CURRENT_DATE, INTERVAL 2 month) group by the_day, the_hour) s group by the_hour;

select AVG(quantity), from_unixtime(ROUND(ts / (60*5)) * 60 * 5) as rounded_time from t_1 group by rounded_time;