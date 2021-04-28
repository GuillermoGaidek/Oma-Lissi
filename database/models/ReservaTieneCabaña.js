module.exports = (sequelize,dataTypes)=>{
	let alias = "ReservaTieneCabaña";
	let cols = {
		/*cod_reserva: { //Deberia agregarse automaticamente por las tablas through
            type: dataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: false,
            comment: null,
            field: "cod_reserva"
        },
        cod_cabaña: { //Deberia agregarse automaticamente por las tablas through
            type: dataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: false,
            comment: null,
            field: "cod_cabaña"
        },*/
        cant_personas: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "cant_personas"
        },
        fecha_entrada: {
            type: dataTypes.DATEONLY,
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "fecha_entrada"
        },
        fecha_salida: {
            type: dataTypes.DATEONLY,
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "fecha_salida"
        }
	};
	let config = {
		tableName: "reservas_tiene_cabañas",
		timestamps: false
	};
	
	const ReservaTieneCabaña = sequelize.define(alias,cols,config);
	
	return ReservaTieneCabaña;
}