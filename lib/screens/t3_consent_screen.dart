import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_colors.dart';
import '../widgets/brand_logo.dart';
import '../widgets/primary_button.dart';
import 't4_dashboard_screen.dart';

class T3ConsentScreen extends StatefulWidget {
  const T3ConsentScreen({super.key});

  @override
  State<T3ConsentScreen> createState() => _T3ConsentScreenState();
}

class _T3ConsentScreenState extends State<T3ConsentScreen> {
  bool _agreed = true;
  bool _isLoading = false;

  void _handleAccept() async {
    if (!_agreed) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Please accept the Privacy Policy and Terms of Use to continue',
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

    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(
        builder: (context) => const T4DashboardScreen(),
      ),
      (route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    final mediaQuery = MediaQuery.of(context);
    final isDesktopOrWeb = mediaQuery.size.width > 600;

    Widget content = Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: LayoutBuilder(
          builder: (context, constraints) {
            return SingleChildScrollView(
              physics: const ClampingScrollPhysics(),
              child: ConstrainedBox(
                constraints: BoxConstraints(minHeight: constraints.maxHeight),
                child: IntrinsicHeight(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 26),
                    child: Column(
                      children: [
                        const SizedBox(height: 20),

                        // Logo without badge icon
                        const BrandLogo(
                          fontSize: 30,
                          showIcon: false,
                        ),

                        const SizedBox(height: 36),

                        // Center Privacy / Shield Illustration
                        SizedBox(
                          height: 180,
                          child: Center(
                            child: Image.asset(
                              'assets/images/consent_shield.png',
                              fit: BoxFit.contain,
                              errorBuilder: (context, error, stackTrace) {
                                return Container(
                                  width: 140,
                                  height: 140,
                                  decoration: BoxDecoration(
                                    color: AppColors.softBlueBg,
                                    shape: BoxShape.circle,
                                  ),
                                  child: const Icon(
                                    Icons.security_rounded,
                                    size: 70,
                                    color: AppColors.primary,
                                  ),
                                );
                              },
                            ),
                          ),
                        ),

                        const SizedBox(height: 28),

                        // Heading: Before you continue
                        RichText(
                          textAlign: TextAlign.center,
                          text: TextSpan(
                            style: GoogleFonts.plusJakartaSans(
                              fontSize: 29,
                              fontWeight: FontWeight.w800,
                              letterSpacing: -0.6,
                            ),
                            children: const [
                              TextSpan(
                                text: 'Before you ',
                                style: TextStyle(color: AppColors.textPrimary),
                              ),
                              TextSpan(
                                text: 'continue',
                                style: TextStyle(color: AppColors.primary),
                              ),
                            ],
                          ),
                        ),

                        const SizedBox(height: 18),

                        // Explanation Paragraph 1
                        Text(
                          'ClassHere uses your information to provide academic features such as your classes, timetable, attendance, notes, and course resources.',
                          textAlign: TextAlign.center,
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 14.5,
                            fontWeight: FontWeight.w400,
                            color: AppColors.textSecondary,
                            height: 1.5,
                          ),
                        ),

                        const SizedBox(height: 16),

                        // Explanation Paragraph 2
                        Text(
                          'Your information is used only to operate and improve your ClassHere experience. We don\'t sell your personal information.',
                          textAlign: TextAlign.center,
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 14.5,
                            fontWeight: FontWeight.w400,
                            color: AppColors.textSecondary,
                            height: 1.5,
                          ),
                        ),

                        const Spacer(),

                        const SizedBox(height: 24),

                        // Consent agreement Card
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 14,
                          ),
                          decoration: BoxDecoration(
                            color: const Color(0xFFF1F6FE),
                            borderRadius: BorderRadius.circular(18),
                            border: Border.all(
                              color: const Color(0xFFE2EDFD),
                              width: 1.2,
                            ),
                          ),
                          child: InkWell(
                            onTap: () {
                              setState(() {
                                _agreed = !_agreed;
                              });
                            },
                            borderRadius: BorderRadius.circular(14),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                // Custom Checkbox matching the design
                                AnimatedContainer(
                                  duration: const Duration(milliseconds: 150),
                                  width: 26,
                                  height: 26,
                                  decoration: BoxDecoration(
                                    color: _agreed
                                        ? AppColors.primary
                                        : Colors.white,
                                    borderRadius: BorderRadius.circular(8),
                                    border: Border.all(
                                      color: _agreed
                                          ? AppColors.primary
                                          : AppColors.border,
                                      width: 1.8,
                                    ),
                                  ),
                                  child: _agreed
                                      ? const Icon(
                                          Icons.check_rounded,
                                          size: 18,
                                          color: Colors.white,
                                        )
                                      : null,
                                ),
                                const SizedBox(width: 14),
                                Expanded(
                                  child: RichText(
                                    text: TextSpan(
                                      style: GoogleFonts.plusJakartaSans(
                                        fontSize: 14,
                                        color: AppColors.textPrimary,
                                        height: 1.35,
                                        fontWeight: FontWeight.w500,
                                      ),
                                      children: const [
                                        TextSpan(text: 'I agree to ClassHere\'s\n'),
                                        TextSpan(
                                          text: 'Privacy Policy',
                                          style: TextStyle(
                                            color: AppColors.primary,
                                            fontWeight: FontWeight.w600,
                                            decoration: TextDecoration.underline,
                                          ),
                                        ),
                                        TextSpan(text: ' and '),
                                        TextSpan(
                                          text: 'Terms of Use',
                                          style: TextStyle(
                                            color: AppColors.primary,
                                            fontWeight: FontWeight.w600,
                                            decoration: TextDecoration.underline,
                                          ),
                                        ),
                                        TextSpan(text: '.'),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),

                        const SizedBox(height: 16),

                        // Accept & Continue Button
                        PrimaryButton(
                          text: 'Accept & Continue',
                          isLoading: _isLoading,
                          showArrow: false,
                          onPressed: _agreed ? _handleAccept : null,
                        ),

                        const SizedBox(height: 14),

                        // Small disclaimer below button
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 10),
                          child: Text(
                            'By continuing, you confirm that you have read and agree to the Privacy Policy and Terms of Use.',
                            textAlign: TextAlign.center,
                            style: GoogleFonts.plusJakartaSans(
                              fontSize: 12,
                              fontWeight: FontWeight.w400,
                              color: AppColors.textMuted,
                              height: 1.35,
                            ),
                          ),
                        ),

                        const SizedBox(height: 20),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );

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
