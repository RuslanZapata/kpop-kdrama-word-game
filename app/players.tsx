import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  ScrollView 
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { COLORS, FONT, SIZES } from '@/constants/theme';
import Button from '@/components/Button';
import { ArrowLeft, Plus, Users } from 'lucide-react-native';

interface Player {
  id: number;
  name: string;
}

export default function PlayersScreen() {
  const params = useLocalSearchParams();
  const categoryId = params.category as string;
  
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: '' }
  ]);

  const handleAddPlayer = () => {
    setPlayers(current => [
      ...current,
      { id: current.length + 1, name: '' }
    ]);
  };

  const handleNameChange = (id: number, name: string) => {
    setPlayers(current =>
      current.map(player =>
        player.id === id ? { ...player, name } : player
      )
    );
  };

  const handleStartGame = () => {
    const playerNames = players.map(p => p.name).filter(name => name.trim() !== '');
    if (playerNames.length === 0) {
      return; // Don't start if no valid names
    }
    
    const queryParams = new URLSearchParams({
      category: categoryId,
      time: '60',
      players: JSON.stringify(playerNames)
    });
    
    router.push(`/game?${queryParams.toString()}`);
  };

  const canStartGame = players.some(player => player.name.trim() !== '');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          title=""
          onPress={() => router.back()}
          variant="outline"
          size="small"
          style={styles.backButton}
          icon={<ArrowLeft color={COLORS.neonPink} size={20} />}
        />
        <Text style={styles.headerTitle}>Jugadores</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.iconContainer}>
          <Users size={48} color={COLORS.neonPink} />
        </View>
        
        <Text style={styles.title}>Configurar Jugadores</Text>
        <Text style={styles.subtitle}>
          Ingresa los nombres de los jugadores para comenzar
        </Text>

        {players.map((player, index) => (
          <View key={player.id} style={styles.playerContainer}>
            <Text style={styles.playerLabel}>
              Jugador {player.id}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa el nombre"
              placeholderTextColor={COLORS.mediumGray}
              value={player.name}
              onChangeText={(text) => handleNameChange(player.id, text)}
            />
          </View>
        ))}

        <Button
          title="Añadir Jugador"
          onPress={handleAddPlayer}
          variant="outline"
          size="large"
          style={styles.addButton}
          icon={<Plus color={COLORS.neonPink} size={20} style={styles.buttonIcon} />}
        />

        <Button
          title="¡Comenzar Juego!"
          onPress={handleStartGame}
          variant="primary"
          size="large"
          style={styles.startButton}
          disabled={!canStartGame}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.m,
    paddingVertical: SIZES.l,
  },
  backButton: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  content: {
    flex: 1,
    padding: SIZES.xl,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SIZES.l,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SIZES.s,
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.lightGray,
    textAlign: 'center',
    marginBottom: SIZES.xl,
  },
  playerContainer: {
    marginBottom: SIZES.l,
  },
  playerLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.white,
    marginBottom: SIZES.s,
  },
  input: {
    backgroundColor: COLORS.cardDark,
    borderRadius: SIZES.radiusMedium,
    padding: SIZES.m,
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
  },
  addButton: {
    marginBottom: SIZES.l,
  },
  startButton: {
    marginBottom: SIZES.xxl,
  },
  buttonIcon: {
    marginRight: SIZES.s,
  },
});