-- Borramos la tabla datosContexto si ya existe
 drop table if exists datosContexto;
  
-- Creamos la tabla datosContexto
 create table datosContexto (
	 phoneNumber varchar(50) PRIMARY KEY,
	 contexto text NOT NULL
 );
 
 select * from datosContexto;