SELECT *
FROM tbl_kbli
LEFT OUTER JOIN tbl_price ON tbl_price.kbli_id_row = tbl_kbli.id_row

SELECT t1.ks, t1.[# Tasks], COALESCE(t2.[# Late], 0) AS [# Late]
FROM 
    (SELECT ks, COUNT(*) AS '# Tasks' FROM Table GROUP BY ks) t1
LEFT JOIN
    (SELECT ks, COUNT(*) AS '# Late' FROM Table WHERE Age > Palt GROUP BY ks) t2
ON (t1.ks = t2.ks);