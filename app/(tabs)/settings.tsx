import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Switch, 
  ScrollView, 
  TouchableOpacity, 
  Linking,
  TextInput,
  Platform
} from 'react-native';
import { COLORS, FONT, SIZES } from '@/constants/theme';
import { Settings, VolumeX, Volume2, CircleHelp as HelpCircle, Heart, ExternalLink, Clock, ArrowLeft, Plus, Minus, Car as Cards } from 'lucide-react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';
import { useGameSettings } from '@/hooks/useGameSettings';

const PREDEFINED_TIMES = [30, 45, 60];
const PREDEFINED_CARD_COUNTS = [5, 10, 15, 20];

export default function SettingsScreen() {
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [vibrationEnabled, setVibrationEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(true);
  const [customTime, setCustomTime] = React.useState('');
  const [isCustomTimeVisible, setIsCustomTimeVisible] = React.useState(false);
  const [customCardCount, setCustomCardCount] = React.useState('');
  const [isCustomCardCountVisible, setIsCustomCardCountVisible] = React.useState(false);
  
  const { settings, setRoundTime, setCardCount } = useGameSettings();
  
  const handleTimeChange = (time: number) => {
    setRoundTime(time);
    setIsCustomTimeVisible(false);
  };

  const handleCustomTimeSubmit = () => {
    const time = parseInt(customTime);
    if (time >= 10 && time <= 300) {
      handleTimeChange(time);
      setCustomTime('');
    }
  };

  const toggleCustomTimeInput = () => {
    setIsCustomTimeVisible(!isCustomTimeVisible);
    if (!isCustomTimeVisible) {
      setCustomTime('');
    }
  };

  const handleCardCountChange = (count: number | 'unlimited') => {
    setCardCount(count);
    setIsCustomCardCountVisible(false);
  };

  const handleCustomCardCountSubmit = () => {
    const count = parseInt(customCardCount);
    if (count >= 3 && count <= 50) {
      handleCardCountChange(count);
      setCustomCardCount('');
    }
  };

  const toggleCustomCardCountInput = () => {
    setIsCustomCardCountVisible(!isCustomCardCountVisible);
    if (!isCustomCardCountVisible) {
      setCustomCardCount('');
    }
  };
  
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
        <Text style={styles.headerTitle}>Ajustes</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Juego</Text>
          
          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Tiempo por ronda</Text>
            <View style={styles.timeButtonsContainer}>
              {PREDEFINED_TIMES.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeButton,
                    settings.roundTime === time && styles.selectedTimeButton,
                  ]}
                  onPress={() => handleTimeChange(time)}
                >
                  <Clock 
                    size={20} 
                    color={settings.roundTime === time ? COLORS.white : COLORS.mediumGray} 
                  />
                  <Text style={[
                    styles.timeButtonText,
                    settings.roundTime === time && styles.selectedTimeButtonText,
                  ]}>{time}s</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.customTimeButton, isCustomTimeVisible && styles.customTimeButtonActive]}
              onPress={toggleCustomTimeInput}
            >
              {isCustomTimeVisible ? (
                <Minus color={COLORS.white} size={20} />
              ) : (
                <Plus color={COLORS.neonPink} size={20} />
              )}
              <Text style={[
                styles.customTimeButtonText,
                isCustomTimeVisible && styles.customTimeButtonTextActive
              ]}>
                {!isCustomTimeVisible && settings.roundTime && !PREDEFINED_TIMES.includes(settings.roundTime)
                  ? `Tiempo personalizado (${settings.roundTime}s)`
                  : 'Tiempo personalizado'}
              </Text>
            </TouchableOpacity>

            {isCustomTimeVisible && (
              <View style={styles.customTimeContainer}>
                <TextInput
                  style={styles.customTimeInput}
                  placeholder="10-300 segundos"
                  placeholderTextColor={COLORS.mediumGray}
                  keyboardType="number-pad"
                  value={customTime}
                  onChangeText={setCustomTime}
                  maxLength={3}
                />
                <Button
                  title="Aplicar"
                  onPress={handleCustomTimeSubmit}
                  variant="primary"
                  size="small"
                  style={styles.customTimeButton}
                  disabled={!customTime || parseInt(customTime) < 10 || parseInt(customTime) > 300}
                />
              </View>
            )}
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Tarjetas por ronda</Text>
            <View style={styles.timeButtonsContainer}>
              {PREDEFINED_CARD_COUNTS.map((count) => (
                <TouchableOpacity
                  key={count}
                  style={[
                    styles.timeButton,
                    settings.cardCount === count && styles.selectedTimeButton,
                  ]}
                  onPress={() => handleCardCountChange(count)}
                >
                  <Cards 
                    size={20} 
                    color={settings.cardCount === count ? COLORS.white : COLORS.mediumGray} 
                  />
                  <Text style={[
                    styles.timeButtonText,
                    settings.cardCount === count && styles.selectedTimeButtonText,
                  ]}>{count}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.customTimeButton,
                settings.cardCount === 'unlimited' && styles.selectedTimeButton
              ]}
              onPress={() => handleCardCountChange('unlimited')}
            >
              <Clock color={settings.cardCount === 'unlimited' ? COLORS.white : COLORS.neonPink} size={20} />
              <Text style={[
                styles.customTimeButtonText,
                settings.cardCount === 'unlimited' && styles.customTimeButtonTextActive
              ]}>
                Sin límite
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.customTimeButton, isCustomCardCountVisible && styles.customTimeButtonActive]}
              onPress={toggleCustomCardCountInput}
            >
              {isCustomCardCountVisible ? (
                <Minus color={COLORS.white} size={20} />
              ) : (
                <Plus color={COLORS.neonPink} size={20} />
              )}
              <Text style={[
                styles.customTimeButtonText,
                isCustomCardCountVisible && styles.customTimeButtonTextActive
              ]}>
                {!isCustomCardCountVisible && 
                  typeof settings.cardCount === 'number' && 
                  !PREDEFINED_CARD_COUNTS.includes(settings.cardCount)
                  ? `Cantidad personalizada (${settings.cardCount})`
                  : 'Cantidad personalizada'}
              </Text>
            </TouchableOpacity>

            {isCustomCardCountVisible && (
              <View style={styles.customTimeContainer}>
                <TextInput
                  style={styles.customTimeInput}
                  placeholder="3-50 tarjetas"
                  placeholderTextColor={COLORS.mediumGray}
                  keyboardType="number-pad"
                  value={customCardCount}
                  onChangeText={setCustomCardCount}
                  maxLength={2}
                />
                <Button
                  title="Aplicar"
                  onPress={handleCustomCardCountSubmit}
                  variant="primary"
                  size="small"
                  style={styles.customTimeButton}
                  disabled={!customCardCount || parseInt(customCardCount) < 3 || parseInt(customCardCount) > 50}
                />
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferencias</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              {soundEnabled ? (
                <Volume2 color={COLORS.white} size={22} />
              ) : (
                <VolumeX color={COLORS.white} size={22} />
              )}
              <Text style={styles.settingLabel}>Sonido</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: COLORS.mediumGray, true: COLORS.neonPink }}
              thumbColor={COLORS.white}
            />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Volume2 color={COLORS.white} size={22} />
              <Text style={styles.settingLabel}>Vibración</Text>
            </View>
            <Switch
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              trackColor={{ false: COLORS.mediumGray, true: COLORS.neonPink }}
              thumbColor={COLORS.white}
            />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Settings color={COLORS.white} size={22} />
              <Text style={styles.settingLabel}>Modo Oscuro</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: COLORS.mediumGray, true: COLORS.neonPink }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre la App</Text>
          
          <TouchableOpacity 
            style={styles.aboutRow}
            onPress={() => Linking.openURL('https://ejemplo.com/ayuda')}
          >
            <View style={styles.aboutInfo}>
              <HelpCircle color={COLORS.white} size={22} />
              <Text style={styles.aboutLabel}>Ayuda y Soporte</Text>
            </View>
            <ExternalLink color={COLORS.lightGray} size={18} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.aboutRow}
            onPress={() => Linking.openURL('https://ejemplo.com/privacidad')}
          >
            <View style={styles.aboutInfo}>
              <HelpCircle color={COLORS.white} size={22} />
              <Text style={styles.aboutLabel}>Política de Privacidad</Text>
            </View>
            <ExternalLink color={COLORS.lightGray} size={18} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.aboutRow}
            onPress={() => {}}
          >
            <View style={styles.aboutInfo}>
              <Heart color={COLORS.white} size={22} />
              <Text style={styles.aboutLabel}>Calificar la App</Text>
            </View>
            <ExternalLink color={COLORS.lightGray} size={18} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versión 1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 K-Pop Word Game</Text>
        </View>
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
    padding: SIZES.l,
  },
  section: {
    marginBottom: SIZES.xl,
    backgroundColor: COLORS.cardDark,
    borderRadius: SIZES.radiusLarge,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.white,
    paddingHorizontal: SIZES.m,
    paddingVertical: SIZES.m,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  timeContainer: {
    padding: SIZES.m,
  },
  timeLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.white,
    marginBottom: SIZES.m,
  },
  timeButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.s,
    marginBottom: SIZES.m,
  },
  timeButton: {
    flex: 1,
    minWidth: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.backgroundDark,
    padding: SIZES.m,
    borderRadius: SIZES.radiusMedium,
    gap: SIZES.xs,
  },
  selectedTimeButton: {
    backgroundColor: COLORS.neonPink,
  },
  timeButtonText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.mediumGray,
  },
  selectedTimeButtonText: {
    color: COLORS.white,
  },
  customTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.m,
    borderRadius: SIZES.radiusMedium,
    backgroundColor: COLORS.backgroundDark,
    gap: SIZES.s,
  },
  customTimeButtonActive: {
    backgroundColor: COLORS.neonPink,
  },
  customTimeButtonText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.neonPink,
  },
  customTimeButtonTextActive: {
    color: COLORS.white,
  },
  customTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.m,
    marginTop: SIZES.m,
  },
  customTimeInput: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: SIZES.radiusMedium,
    padding: SIZES.m,
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.m,
    paddingVertical: SIZES.m,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.white,
    marginLeft: SIZES.m,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.m,
    paddingVertical: SIZES.l,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  aboutInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aboutLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.white,
    marginLeft: SIZES.m,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: SIZES.xxl,
    marginBottom: SIZES.xxl,
  },
  versionText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.mediumGray,
    marginBottom: SIZES.xs,
  },
  copyrightText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xSmall,
    color: COLORS.mediumGray,
  },
});