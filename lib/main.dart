import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/t1_teacher_login_screen.dart';
import 'screens/t2_verify_otp_screen.dart';
import 'screens/t3_consent_screen.dart';
import 'screens/t4_dashboard_screen.dart';
import 'theme/app_colors.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
      statusBarBrightness: Brightness.light,
    ),
  );
  runApp(const ClassHereApp());
}

class ClassHereApp extends StatelessWidget {
  const ClassHereApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ClassHere',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: Colors.white,
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.primary,
          primary: AppColors.primary,
          surface: Colors.white,
        ),
        textTheme: GoogleFonts.plusJakartaSansTextTheme(
          Theme.of(context).textTheme,
        ),
      ),
      initialRoute: '/t1',
      routes: {
        '/t1': (context) => const T1TeacherLoginScreen(),
        '/t2': (context) => const T2VerifyOtpScreen(phoneNumber: '9876544823'),
        '/t3': (context) => const T3ConsentScreen(),
        '/t4': (context) => const T4DashboardScreen(),
      },
    );
  }
}
