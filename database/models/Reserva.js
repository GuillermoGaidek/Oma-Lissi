module.exports = (sequelize,dataTypes)=>{
	let alias = "reserva";
	let cols = {
		cod_reserva: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: true,
            comment: null,
            field: "cod_reserva"
        },
        dni: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "dni"
        },
        monto_total: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "monto_total"
        },
        monto_seña: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "monto_seña"
        },
        fecha_creacion_reserva: {
            type: DataTypes.DATEONLY,
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
	
	const reserva = sequelize.define(alias,cols,config);
	
	Pelicula.associate=function(models){  //aca van las relaciones. Hay que configurarlo en el codigo de las 2 tablas. En la otra ira lo contrario a esta.
		Pelicula.belongsTo(models.Generos,{
			as: "generos",
			foreignkey: "genre_id"
		})
	}
	
	return reserva;
}