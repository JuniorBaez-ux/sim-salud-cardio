// //Pressure Model
module.exports = (sequelize, DataTypes) => {
    const Pressure = sequelize.define( "pressure", {
        systolicpressure: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        diastolicpressure: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    }, {timestamps: true}, )
    return Pressure
 }
 