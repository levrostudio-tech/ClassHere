import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_colors.dart';
import '../widgets/app_back_button.dart';
import '../widgets/brand_logo.dart';
import '../widgets/campus_footer.dart';
import '../widgets/phone_input_field.dart';
import '../widgets/primary_button.dart';
import '../widgets/top_background_decor.dart';
import 't2_verify_otp_screen.dart';

class T1TeacherLoginScreen extends StatefulWidget {
  const T1TeacherLoginScreen({super.key});

  @override
  State<T1TeacherLoginScreen> createState() => _T1TeacherLoginScreenState();
}

class _T1TeacherLoginScreenState extends State<T1TeacherLoginScreen> {
  final TextEditingController _phoneController = TextEditingController();
  bool _isLoading = false;

  @override
  void dispose() {
    _phoneController.dispose();
    super.dispose();
  }

  void _handleContinue() async {
    final phone = _phoneController.text.trim();
    if (phone.length < 10) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Please enter a valid 10-digit mobile number',
            style: GoogleFonts.plusJakartaSans(),
          ),
          backgroundColor: Colors.redAccent,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        ),
      );
      return;
    }

    setState(() => _isLoading = true);
    await Future.delayed(const Duration(milliseconds: 350));
    if (!mounted) return;
    setState(() => _isLoading = false);

    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => T2VerifyOtpScreen(phoneNumber: phone),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final mediaQuery = MediaQuery.of(context);
    final isDesktopOrWeb = mediaQuery.size.width > 600;

    Widget content = Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          // Background soft concentric circular graphics
          const Positioned.fill(
            child: TopBackgroundDecor(),
          ),

          // Main scrollable content
          SafeArea(
            child: Column(
              children: [
                // Top App Bar row with Back Button
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                  child: Row(
                    children: [
                      AppBackButton(
                        onPressed: () {
                          // If there's back history pop, otherwise show notice
                          if (Navigator.of(context).canPop()) {
                            Navigator.of(context).pop();
                          }
                        },
                      ),
                    ],
                  ),
                ),

                // Main body
                Expanded(
                  child: LayoutBuilder(
                    builder: (context, constraints) {
                      return SingleChildScrollView(
                        physics: const ClampingScrollPhysics(),
                        child: ConstrainedBox(
                          constraints: BoxConstraints(minHeight: constraints.maxHeight),
                          child: IntrinsicHeight(
                            child: Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 24),
                              child: Column(
                                children: [
                                  const SizedBox(height: 12),

                                  // Brand Logo
                                  const BrandLogo(
                                    iconSize: 86,
                                    fontSize: 34,
                                    showIcon: true,
                                  ),

                                  const SizedBox(height: 32),

                                  // Title
                                  Text(
                                    'Teacher Login',
                                    textAlign: TextAlign.center,
                                    style: GoogleFonts.plusJakartaSans(
                                      fontSize: 27,
                                      fontWeight: FontWeight.w800,
                                      color: AppColors.textPrimary,
                                      letterSpacing: -0.5,
                                    ),
                                  ),

                                  const SizedBox(height: 10),

                                  // Subtitle
                                  Text(
                                    'Enter your registered mobile number\nto receive an OTP on WhatsApp.',
                                    textAlign: TextAlign.center,
                                    style: GoogleFonts.plusJakartaSans(
                                      fontSize: 14.5,
                                      fontWeight: FontWeight.w500,
                                      color: AppColors.textSecondary,
                                      height: 1.45,
                                    ),
                                  ),

                                  const SizedBox(height: 32),

                                  // Phone Input Field
                                  PhoneInputField(
                                    controller: _phoneController,
                                    onSubmitted: (_) => _handleContinue(),
                                  ),

                                  const SizedBox(height: 20),

                                  // Continue Button
                                  PrimaryButton(
                                    text: 'Continue',
                                    isLoading: _isLoading,
                                    showArrow: true,
                                    onPressed: _handleContinue,
                                  ),

                                  const Spacer(),

                                  // Campus Building illustration at bottom
                                  const SizedBox(height: 24),
                                  const CampusFooter(),
                                ],
                              ),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );

    // If viewed on web or desktop, wrap in an elegant mobile preview frame
    if (isDesktopOrWeb) {
      return Container(
        color: const Color(0xFF0F172A),
        child: Center(
          child: Container(
            width: 430,
            height: 900,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(44),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withAlpha(120),
                  blurRadius: 40,
                  offset: const Offset(0, 20),
                ),
              ],
            ),
            clipBehavior: Clip.antiAlias,
            child: content,
          ),
        ),
      );
    }

    return content;
  }
}
