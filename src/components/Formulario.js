import React, { useState, useEffect } from 'react';
import {
    Modal,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    View,
    ScrollView,
    Pressable,
    Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const Formulario = ({
    modalVisible,
    cerrarModal,
    pacientes,
    setPacientes,
    paciente: pacienteObj,
    setPaciente: setPacienteApp,
}) => {
    const [id, setId] = useState('');
    const [paciente, setPaciente] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [sintomas, setSintomas] = useState('');
    const today = new Date();

    useEffect(() => {
        if (Object.keys(pacienteObj).length > 0) {
            setId(pacienteObj.id);
            setPaciente(pacienteObj.paciente);
            setPropietario(pacienteObj.propietario);
            setEmail(pacienteObj.email);
            setTelefono(pacienteObj.telefono);
            setFecha(pacienteObj.fecha);
            setSintomas(pacienteObj.sintomas);
        }
    }, [pacienteObj]);

    const handleNuevaCita = () => {
        if ([paciente, propietario, email, fecha, sintomas].includes('')) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        const nuevoPaciente = {
            id: Date.now(),
            paciente,
            propietario,
            email,
            telefono,
            fecha,
            sintomas,
        };

        //* Revisar si es un paciente nuevo o para edición
        if (id) {
            // Editando
            nuevoPaciente.id = id;
            const pacientesActualizados = pacientes.map((pacienteState) =>
                pacienteState.id === nuevoPaciente.id
                    ? nuevoPaciente
                    : pacienteState
            );

            setPacientes(pacientesActualizados);
            setPacienteApp({});
        } else {
            // Nuevo
            nuevoPaciente.id = Date.now();
            setPacientes([...pacientes, nuevoPaciente]);
        }
        cerrarModal()
        setId('');
        setPaciente('');
        setPropietario('');
        setEmail('');
        setTelefono('');
        setFecha(new Date());
        setSintomas('');
    };

    return (
        <Modal animationType="slide" visible={modalVisible}>
            <SafeAreaView style={styles.contenido}>
                <ScrollView>
                    <Text style={styles.titulo}>
                        {pacienteObj.id ? 'Editar cita' : 'Nueva cita'}
                    </Text>

                    <Pressable
                        onPress={() => {
                            setPacienteApp({});
                            setId('');
                            setPaciente('');
                            setPropietario('');
                            setEmail('');
                            setTelefono('');
                            setFecha(new Date());
                            setSintomas('');
                            cerrarModal()
                        }}
                        style={styles.btnCancelar}
                    >
                        <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
                    </Pressable>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre del paciente</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre del paciente"
                            placeholderTextColor={'#666'}
                            value={paciente}
                            onChangeText={setPaciente}
                        ></TextInput>
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre del propietario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre del propietario"
                            placeholderTextColor={'#666'}
                            value={propietario}
                            onChangeText={setPropietario}
                        ></TextInput>
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>
                            Correo electrónico del propietario
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Correo electrónico del propietario"
                            placeholderTextColor={'#666'}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        ></TextInput>
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>
                            Teléfono del propietario
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Teléfono del propietario"
                            placeholderTextColor={'#666'}
                            keyboardType="number-pad"
                            maxLength={8}
                            value={telefono}
                            onChangeText={setTelefono}
                        ></TextInput>
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Fecha alta</Text>

                        <View style={styles.fechaContenedor}>
                            <DatePicker
                                textColor="#000"
                                minimumDate={today}
                                locale="es"
                                androidVariant="nativeAndroid"
                                date={fecha}
                                onDateChange={(date) => setFecha(date)}
                            />
                        </View>
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Síntomas del paciente</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Síntomas del paciente"
                            placeholderTextColor={'#666'}
                            multiline={true}
                            numberOfLines={4}
                            value={sintomas}
                            onChangeText={setSintomas}
                        ></TextInput>
                    </View>

                    <Pressable
                        onPress={handleNuevaCita}
                        style={styles.btnGuardar}
                    >
                        <Text style={styles.btnGuardarTexto}>
                            {pacienteObj.id ? 'Guardar cambios' : 'Guardar cita'}
                        </Text>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#5B8291',
        flex: 1,
    },
    titulo: {
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 64,
        color: '#FFF',
    },

    btnCancelar: {
        marginVertical: 16,
        backgroundColor: '#666',
        marginHorizontal: 30,
        padding: 16,
        borderRadius: 10,
    },
    btnCancelarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        textTransform: 'uppercase',
        fontSize: 16,
    },

    btnGuardar: {
        marginVertical: 16,
        backgroundColor: '#2E424D',
        marginHorizontal: 30,
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#98DAD9',
    },
    btnGuardarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        textTransform: 'uppercase',
        fontSize: 16,
    },

    campo: {
        marginTop: 6,
        marginBottom: 6,
        marginHorizontal: 30,
    },
    label: {
        color: '#FFF',
        fontSize: 24,
        marginBottom: 12,
        marginTop: 12,
    },
    input: {
        color: '#000',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 10,
    },
    fechaContenedor: {
        backgroundColor: '#FFF',
        color: '#000',
        borderRadius: 10,
    },
});

export default Formulario;
