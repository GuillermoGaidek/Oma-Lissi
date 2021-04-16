module.exports = (sequelize,dataTypes)=>{
	let alias = "Cliente";
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
	
	const Cliente = sequelize.define(alias,cols,config);
	
	Cliente.associate=function(models){ 
		Cliente.hasMany(models.Reserva,{as: "Reservas",foreignkey: "dni"})
	}
	
	return Cliente;
}