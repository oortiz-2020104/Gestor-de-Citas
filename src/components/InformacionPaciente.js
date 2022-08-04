import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const InformacionPaciente = ({ paciente, setPaciente, setModalPaciente }) => {
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
        <SafeAreaView style={styles.contenedor}>
            <Text style={styles.titulo}>Información del paciente</Text>
            <View>
                <Pressable
                    onPress={() => {
                        setPaciente({});
                        setModalPaciente(false);
                    }}
                    style={styles.btnCerrar}
                >
                    <Text style={styles.btnCerrarTexto}>X Cerrar</Text>
                </Pressable>
            </View>

            <View style={styles.contenido}>
                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre del paciente</Text>
                    <Text style={styles.valor}>{paciente.paciente}</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre del propietario</Text>
                    <Text style={styles.valor}>{paciente.propietario}</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Correo electrónico</Text>
                    <Text style={styles.valor}>{paciente.email}</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Teléfono</Text>
                    <Text style={styles.valor}>{paciente.telefono}</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Fecha alta</Text>
                    <Text style={styles.valor}>
                        {formatearFecha(paciente.fecha)}
                    </Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Síntomas</Text>
                    <Text style={styles.valor}>{paciente.sintomas}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#5B8291',
        flex: 1,
    },

    text: {
        color: '#FFF',
    },
    titulo: {
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 64,
        color: '#FFF',
    },

    btnCerrar: {
        marginVertical: 16,
        backgroundColor: '#666',
        marginHorizontal: 30,
        padding: 16,
        borderRadius: 10,
    },
    btnCerrarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        textTransform: 'uppercase',
        fontSize: 16,
    },

    contenido: {
        backgroundColor: '#EAEBED',
        marginHorizontal: 30,
        borderRadius: 10,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },

    campo: {
        marginBottom: 16,
    },
    label: {
        textTransform: 'uppercase',
        color: '#374151',
        fontSize: 12,
    },

    valor: {
        color: '#000',
        fontWeight: '900',
        fontSize: 24,
    },
});

export default InformacionPaciente;
