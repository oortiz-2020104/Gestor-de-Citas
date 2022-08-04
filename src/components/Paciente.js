import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

const Paciente = ({
    item,
    setModalVisible,
    setPaciente,
    pacienteEditar,
    pacienteEliminar,
    setModalPaciente,
}) => {
    const { paciente, fecha, id } = item;
    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);
        const diasSemana = [
            'Domingo',
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado',
        ];
        const meses = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ];
        const dia = diasSemana[nuevaFecha.getDay()];
        const numeroDia = nuevaFecha.getDate();
        const mes = meses[nuevaFecha.getMonth()];
        const ano = nuevaFecha.getUTCFullYear();
        const horas = nuevaFecha.getHours();
        const minutos = nuevaFecha.getMinutes();
        const fechaFinal = `${dia}, ${numeroDia} de ${mes} de ${ano} a las ${horas}:${minutos}`;

        return fechaFinal;
    };

    return (
        <Pressable
            onLongPress={() => {
                setModalPaciente(true);
                setPaciente(item)
            }}
        >
            <View style={styles.contenedor}>
                <Text style={styles.label}>Paciente:</Text>
                <Text style={styles.texto}>{paciente}</Text>
                <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>

                <View style={styles.contenedorBotones}>
                    <Pressable
                        style={[styles.btn, styles.btnEditar]}
                        onPress={() => {
                            setModalVisible(true);
                            pacienteEditar(id);
                        }}
                    >
                        <Text style={styles.btnText}>Editar</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.btn, styles.btnEliminar]}
                        onPress={() => {
                            pacienteEliminar(id);
                        }}
                    >
                        <Text style={styles.btnText}>Eliminar</Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#EAEBED',
        padding: 20,
        borderRadius: 10,
        marginBottom: 16,
    },

    label: {
        color: '#374151',
        textTransform: 'uppercase',
        marginBottom: 10,
    },
    texto: {
        color: '#5B8291',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    fecha: {
        color: '#374151',
    },

    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    btn: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    btnEditar: {
        backgroundColor: '#F59E0B',
    },
    btnEliminar: {
        backgroundColor: '#EF4444',
    },
    btnText: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default Paciente;
