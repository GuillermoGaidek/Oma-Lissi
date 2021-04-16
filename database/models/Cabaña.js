module.exports = (sequelize,dataTypes)=>{
	let alias = "Cabaña";
	let cols = {
		cod_cabaña: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: null,
			primaryKey: true,
			autoIncrement: true,
			comment: null,
			field: "cod_cabaña"
		},
		capacidad: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "capacidad"
		}
	};
	let config = {
		tableName: "cabañas",
		timestamps: false
	};
	
	const Cabaña = sequelize.define(alias,cols,config);
	
	Cabaña.associate=function(models){
		Cabaña.belongsToMany(models.Reserva,{through: models.ReservaTieneCabaña,
			as: "TieneReservas"});
	}
	
	return Cabaña;
}