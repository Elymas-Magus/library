create database library;

use library;

create table users (
	id bigint unsigned not null primary key auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE livro_autor (
	id bigint unsigned not null primary key auto_increment,
	nome varchar(255) not null,
	activated tinyint default 1,
	userId bigint unsigned not null,
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	deletedAt DATETIME NULL DEFAULT NULL
);

CREATE TABLE livro_editora (
	id bigint unsigned not null primary key auto_increment,
	nome varchar(255) not null,
	activated tinyint default 1,
	userId int unsigned not null,
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	deletedAt DATETIME NULL DEFAULT NULL
);

create table livros (
	id bigint unsigned not null primary key auto_increment,
    titulo varchar(255) not null,
	observacao text,
	AutorId bigint unsigned,
	EditoraId bigint unsigned,
    userId bigint unsigned,
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	deletedAt DATETIME NULL DEFAULT NULL,
	CONSTRAINT autor_livro_fk
		foreign key (autorId) references livros_autor(id),
	CONSTRAINT editora_livro_fk
		foreign key (editoraId) references livros_editora(id)
);