module.exports = (sequelize,dataTypes)=>{
	let alias = "cliente";
	let cols = {
		dni: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: null,
			primaryKey: true,
			autoIncrement: false,
			comment: null,
			field: "dni"
		},
		nombre: {
			type: DataTypes.STRING(45),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "nombre"
		},
		apellido: {
			type: DataTypes.STRING(45),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "apellido"
		},
		telefono: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "telefono"
		},
		mail: {
			type: DataTypes.STRING(45),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "mail"
		},
		ocupacion: {
			type: DataTypes.STRING(45),
			allowNull: true,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "ocupacion"
		},
		descripcion: {
			type: DataTypes.STRING(45),
			allowNull: true,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "descripcion"
		},
		cuenta_bancaria: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "cuenta_bancaria"
		}
	};
	let config = {
			tableName: "clientes",
			timestamps: false
	};
	
	const cliente = sequelize.define(alias,cols,config);
	
	Pelicula.associate=function(models){  //aca van las relaciones. Hay que configurarlo en el codigo de las 2 tablas. En la otra ira lo contrario a esta.
		Pelicula.belongsTo(models.Generos,{
			as: "generos",
			foreignkey: "genre_id"
		})
	}
	
	return cliente;
}