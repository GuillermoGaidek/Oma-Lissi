module.exports = (sequelize,dataTypes)=>{
	let alias = "Reserva";
	let cols = {
		cod_reserva: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: true,
            comment: null,
            field: "cod_reserva"
        },
        dni: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "dni"
        },
        monto_total: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "monto_total"
        },
        monto_seña: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "monto_seña"
        },
        fecha_creacion_reserva: {
            type: dataTypes.DATEONLY,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "fecha_creacion_reserva"
        }
	};
	let config = {
		tableName: "reservas",
		timestamps: false
	};
	
	const Reserva = sequelize.define(alias,cols,config);
	
	Reserva.associate = function(models){ 
		Reserva.belongsTo(models.Cliente,{as: "Clientes"});//no haria falta poner la FK porque la pone sola automaticamente
        Reserva.belongsToMany(models.Cabaña,{through: models.ReservaTieneCabaña,
        as: "TieneCabañas"});
    }
	
	return Reserva;
}