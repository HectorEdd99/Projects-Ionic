CREATE TABLE SERIES(
	idSerie  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	NombreSerie VARCHAR(40)
)
;
CREATE TABLE TEMPORADAS(
	idTemporada INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	idSerie INT,
	nombreTemporada VARCHAR(40),
	CONSTRAINT fk_idSerie FOREIGN KEY(idSerie) REFERENCES SERIES(idSerie)
);

CREATE TABLE CAPITULOS(
	idCapitulos INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	idTemporada INT,
	nombreCap VARCHAR(40),
	visto BOOLEAN,
    CONSTRAINT fk_idTemporada FOREIGN KEY(idTemporada) REFERENCES TEMPORADAS(idTemporada)
)

INSERT INTO SERIES (nombreSerie) VALUES ('Rick y Morty');
INSERT INTO SERIES (nombreSerie) VALUES ('Deardevil');

INSERT INTO TEMPORADAS (idSerie, nombreTemporada) VALUES (1,'Temporada 1');
INSERT INTO TEMPORADAS (idSerie, nombreTemporada) VALUES (1,'Temporada 2');
INSERT INTO TEMPORADAS (idSerie, nombreTemporada) VALUES (1, 'Temporada 3');
INSERT INTO TEMPORADAS (idSerie, nombreTemporada) VALUES (2,'Temporada 1');
INSERT INTO TEMPORADAS (idSerie, nombreTemporada) VALUES (2,'Temporada 2');

INSERT INTO CAPITULOS (idTemporada, nombreCap, visto) VALUES (1,'Capítulo 1', true);
INSERT INTO CAPITULOS (idTemporada, nombreCap, visto) VALUES (1,'Capítulo 2', true);
INSERT INTO CAPITULOS (idTemporada, nombreCap, visto) VALUES (1,'Capítulo 3', true);
INSERT INTO CAPITULOS (idTemporada, nombreCap, visto) VALUES (1,'Capítulo 4', false);
