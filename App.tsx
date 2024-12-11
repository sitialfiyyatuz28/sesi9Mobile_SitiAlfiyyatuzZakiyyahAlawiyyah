import React, { useState } from "react";
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert,
} from "react-native";
import {
  responsiveWidth, responsiveHeight, responsiveFontSize,
} from "react-native-responsive-dimensions";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [cards, setCards] = useState([
    { id: 1, title: "Bromo", image: "https://tse1.mm.bing.net/th?id=OIP.pzkv3n05y3a7IRMBtUw8NwHaE8&pid=Api&P=0&h=220" },
    { id: 2, title: "Rinjani", image: "https://tse2.mm.bing.net/th?id=OIP.LxiazPLXzer44dvCh1uemQHaE8&pid=Api&P=0&h=220" },
  ]);

  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardImage, setNewCardImage] = useState("");

  const validateImageUrl = (url: string) => {
    return /\.(jpeg|jpg|gif|png)$/i.test(url);
  };

  const handleLogin = () => {
    if (username.trim().toLowerCase() === "alfi" && password === "alfi") {
      setIsLoggedIn(true);
      Alert.alert("Login Berhasil", "Selamat datang di aplikasi Travelin!");
    } else {
      Alert.alert("Login Gagal", "Username atau password salah. Coba lagi.");
    }
  };

  const addCard = () => {
    if (!newCardTitle.trim() || !newCardImage.trim()) {
      Alert.alert("Error", "Tolong isi semua bidang sebelum menambahkan destinasi.");
      return;
    }

    if (!validateImageUrl(newCardImage)) {
      Alert.alert("Error", "URL gambar tidak valid. Pastikan formatnya .jpg, .jpeg, .png, atau .gif.");
      return;
    }

    const newCard = {
      id: cards.length + 1,
      title: newCardTitle.trim(),
      image: newCardImage.trim(),
    };

    setCards((prevCards) => [...prevCards, newCard]);
    setNewCardTitle("");
    setNewCardImage("");
    Alert.alert("Destinasi Ditambahkan", "Destinasi baru berhasil ditambahkan!");
  };

  const deleteCard = (id: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    Alert.alert("Destinasi Dihapus", "Destinasi telah berhasil dihapus!");
  };

  const handleCardClick = (destination: string) => {
    Alert.alert("Paket Wisata", `Anda memilih paket wisata: ${destination}`);
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Login ke Travelin</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome to Travelin</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>Pilihan Paket</Text>
        <View style={styles.cardContainer}>
          {cards.map((card) => (
            <View key={card.id} style={styles.card}>
              <TouchableOpacity onPress={() => handleCardClick(card.title)}>
                <Image source={{ uri: card.image }} style={styles.cardImage} />
                <Text style={styles.cardText}>{card.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteCard(card.id)}
              >
                <Text style={styles.deleteButtonText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.addDestinationContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nama Destinasi"
            value={newCardTitle}
            onChangeText={setNewCardTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="URL Gambar"
            value={newCardImage}
            onChangeText={setNewCardImage}
          />
          <TouchableOpacity style={styles.loginButton} onPress={addCard}>
            <Text style={styles.loginButtonText}>Tambah Destinasi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: responsiveWidth(5),
  },
  loginTitle: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    marginBottom: responsiveHeight(3),
  },
  input: {
    width: "100%",
    height: responsiveHeight(6),
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: responsiveHeight(2),
    backgroundColor: "#fff",
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(5),
    borderRadius: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: responsiveFontSize(2),
    textAlign: "center",
  },
  header: {
    backgroundColor: "#007bff",
    paddingVertical: responsiveHeight(2),
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
  },
  banner: {
    marginVertical: responsiveHeight(2),
    alignItems: "center",
  },
  bannerImage: {
    width: responsiveWidth(90),
    height: responsiveHeight(25),
    borderRadius: 10,
  },
  content: {
    paddingHorizontal: responsiveWidth(5),
  },
  contentTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    marginBottom: responsiveHeight(2),
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  card: {
    width: responsiveWidth(28),
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },
  cardImage: {
    width: responsiveWidth(25),
    height: responsiveWidth(25),
    borderRadius: 10,
    marginBottom: responsiveHeight(1),
  },
  cardText: {
    fontSize: responsiveFontSize(2),
    textAlign: "center",
  },
  deleteButton: {
    marginTop: responsiveHeight(1),
    backgroundColor: "red",
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  addDestinationContainer: {
    paddingHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(3),
  },
});

export default App;