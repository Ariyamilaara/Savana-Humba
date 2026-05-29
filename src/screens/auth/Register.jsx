import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../libs/supabase';
import { colors, fonts } from '../../theme';

const Register = () => {
  const navigation = useNavigation();

  // State untuk menyimpan input form registrasi
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Fungsi register menggunakan Supabase Auth
  const handleRegister = async () => {
    // Validasi form
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Peringatan', 'Semua field wajib diisi!');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password dan konfirmasi password tidak cocok!');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password minimal 8 karakter!');
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    if (!passwordRegex.test(password)) {
      Alert.alert('Error', 'Password harus mengandung huruf dan angka!');
      return;
    }

    setLoading(true);
    try {
      // Daftarkan user ke Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;

      // Simpan data user ke tabel users
      const { error: insertError } = await supabase.from('users').upsert({
        id: authData.user.id,
        full_name: fullName,
        email: email,
        photo_url: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=400',
        created_at: new Date().toISOString(),
      });
      if (insertError) throw insertError;

      Alert.alert('Berhasil! ✅', 'Akun berhasil dibuat! Silakan login.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.inner}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.appName}>SavanaHumba</Text>
            <Text style={styles.subtitle}>Buat akun untuk mulai menjelajah</Text>
          </View>

          {/* Form Register */}
          <View style={styles.form}>
            <Text style={styles.formTitle}>Daftar</Text>

            {/* Input Nama Lengkap */}
            <Text style={styles.label}>Nama Lengkap</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Masukkan nama lengkap..."
                placeholderTextColor={colors.textLight}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Input Email */}
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Masukkan email..."
                placeholderTextColor={colors.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Input Password */}
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Minimal 8 karakter..."
                placeholderTextColor={colors.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.showText}>{showPassword ? 'Sembunyikan' : 'Tampilkan'}</Text>
              </TouchableOpacity>
            </View>

            {/* Input Konfirmasi Password */}
            <Text style={styles.label}>Konfirmasi Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ulangi password..."
                placeholderTextColor={colors.textLight}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
              />
            </View>

            {/* Tombol Register */}
            <TouchableOpacity
              style={[styles.btnRegister, loading && { opacity: 0.6 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.btnRegisterText}>Daftar</Text>
              )}
            </TouchableOpacity>

            {/* Link ke Login */}
            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Sudah punya akun? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Masuk sekarang</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inner: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  appName: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.extraBold,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textLight,
    fontFamily: fonts.regular,
    marginTop: 4,
    textAlign: 'center',
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  formTitle: {
    fontSize: 20,
    color: colors.text,
    fontFamily: fonts.bold,
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    color: colors.text,
    fontFamily: fonts.semiBold,
    marginBottom: 6,
    marginTop: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontFamily: fonts.regular,
  },
  showText: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
  btnRegister: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  btnRegisterText: {
    fontSize: 15,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 13,
    color: colors.textLight,
    fontFamily: fonts.regular,
  },
  loginLink: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
});