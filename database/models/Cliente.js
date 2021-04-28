module.exports = (sequelize,dataTypes)=>{
	let alias = "Cliente";
	let cols = {
		dni: {
			type: dataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: null,
			primaryKey: true,
			autoIncrement: false,
			comment: null,
			field: "dni"
		},
		nombre: {
			type: dataTypes.STRING(45),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "nombre"
		},
		apellido: {
			type: dataTypes.STRING(45),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "apellido"
		},
		telefono: {
			type: dataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "telefono"
		},
		mail: {
			type: dataTypes.STRING(45),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "mail"
		},
		contraseña: {
			type: dataTypes.STRING(45),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "contraseña"
		},
		ocupacion: {
			type: dataTypes.STRING(45),
			allowNull: true,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "ocupacion"
		},
		descripcion: {
			type: dataTypes.STRING(45),
			allowNull: true,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "descripcion"
		},
		cuenta_bancaria: {
			type: dataTypes.INTEGER(11),
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
	
	const Cliente = sequelize.define(alias,cols,config);
	
	Cliente.associate=function(models){ 
		Cliente.hasMany(models.Reserva,{as: "Reservas",foreignkey: "dni"})
	}
	
	return Cliente;
}