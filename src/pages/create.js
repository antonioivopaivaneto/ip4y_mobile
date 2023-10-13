import React, { useEffect, useState } from 'react';
import { Image,View, Text, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/v1/pessoa') // Substitua pela URL da sua API
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (item) => {
    // Implemente a lógica para editar o item aqui
  };

  const handleDelete = (item) => {
    axios.post('http://localhost:8000/api/v1/pessoa/' + item.id, {
      _method: 'DELETE',
    })
      .then((response) => {
        setData((prevData) => prevData.filter((dataItem) => dataItem.id !== item.id));
      })
      .catch((error) => {
        console.error('Erro ao excluir:', error);
      });
  };
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.logo}
        source={require('./logo.svg')}
      />

<TouchableOpacity
              style={styles.addButton}
              onPress={() => handleEdit(item)}
            >
              <Text>Cadastrar</Text>
            </TouchableOpacity>      {data.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.boldText}>{item.nome}</Text>
          <Text style={styles.infoText}>CPF: {item.cpf}</Text>
          <Text style={styles.infoText}>Data de Nascimento: {item.data_de_nascimento}</Text>
          <Text style={styles.infoText}>Email: {item.email}</Text>
          <Text style={styles.infoText}>Contato: {item.contato}</Text>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEdit(item)}
            >
              <Icon name="edit" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item)}
            >
              <Icon name="trash" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#000' // Fundo escuro
  },
  card: {
    width: '45%',
    margin: '2.5%',
    padding: 16,
    backgroundColor: '#111', // Cor de fundo escura
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: 'green', // Cor da borda verde
    borderWidth: 1, // Largura da borda
  },
  logo: {
    marginBottom:20,
    width: 200,
    height: 30,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // Cor do texto em negrito
  },
  infoText: {
    fontSize: 14,
    color: 'lightgray', // Cor do texto informativo
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#444', // Cor do botão "Editar" mais claro
    padding: 5,
    alignItems: 'center',
    borderRadius: 4,
  },
  deleteButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#FF0000', // Cor do botão "Excluir" mais claro
    padding: 5,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: 'white', // Cor do texto do botão
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
