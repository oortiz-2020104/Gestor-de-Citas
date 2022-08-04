import React, { useState } from 'react';
import {
    Button,
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    Pressable,
    Modal,
    FlatList,
    Alert,
} from 'react-native';
import Formulario from './src/components/Formulario';
import InformacionPaciente from './src/components/InformacionPaciente';
import Paciente from './src/components/Paciente';

const App = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const [modalPaciente, setModalPaciente] = useState(false);

    const pacienteEditar = (id) => {
        const pacienteEditar = pacientes.filter(
            (paciente) => paciente.id === id
        );
        setPaciente(pacienteEditar[0]);
    };

    const pacienteEliminar = (id) => {
        Alert.alert(
            '¿Deseas eliminar este paciente?',
            'No se podrá recuperar el paciente',
            [
                { text: 'Cancelar' },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        const pacientesActualizados = pacientes.filter(
                            (pacientesState) => pacientesState.id !== id
                        );
                        setPacientes(pacientesActualizados);
                    },
                },
            ]
        );
    };

    const cerrarModal = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Administrador de citas {''}</Text>
            <Text style={[styles.titulo, styles.tituloBold]}>Veterinaria</Text>

            <Pressable
                onPress={() => setModalVisible(true)}
                style={styles.btnNuevaCita}
            >
                <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
            </Pressable>

            {pacientes.length === 0 ? (
                <Text style={styles.noPacientes}>No hay pacientes aún</Text>
            ) : (
                <FlatList
                    style={styles.listado}
                    data={pacientes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Paciente
                                item={item}
                                setModalVisible={setModalVisible}
                                setPaciente={setPaciente}
                                pacienteEditar={pacienteEditar}
                                pacienteEliminar={pacienteEliminar}
                                setModalPaciente={setModalPaciente}
                            />
                        );
                    }}
                />
            )}

            {modalVisible && (
                <Formulario
                    modalVisible={modalVisible}
                    cerrarModal={cerrarModal}
                    pacientes={pacientes}
                    setPacientes={setPacientes}
                    paciente={paciente}
                    setPaciente={setPaciente}
                />
            )}

            <Modal visible={modalPaciente} animationType="slide">
                <InformacionPaciente
                    paciente={paciente}
                    setPaciente={setPaciente}
                    setModalPaciente={setModalPaciente}
                />
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2E424D',
        flex: 1,
    },

    titulo: {
        textAlign: 'center',
        fontSize: 42,
        marginTop: 64,
        color: '#EAEBED',
        fontWeight: '600',
    },
    tituloBold: {
        marginTop: 5,
        fontWeight: '900',
        color: '#98DAD9',
    },

    btnNuevaCita: {
        marginTop: 32,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: '#5B8291',
        borderRadius: 10,
    },
    btnTextoNuevaCita: {
        fontSize: 24,
        fontWeight: '900',
        textTransform: 'uppercase',
        color: '#FFF',
        textAlign: 'center',
    },

    noPacientes: {
        textAlign: 'center',
        marginTop: 32,
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
    },

    textModal: {
        fontSize: 32,
        marginTop: 16,
        color: '#000',
    },

    listado: {
        marginTop: 50,
        marginHorizontal: 30,
    },
});

export default App;
