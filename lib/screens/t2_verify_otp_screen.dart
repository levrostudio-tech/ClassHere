import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_colors.dart';
import '../widgets/app_back_button.dart';
import '../widgets/brand_logo.dart';
import '../widgets/campus_footer.dart';
import '../widgets/primary_button.dart';
import '../widgets/top_background_decor.dart';
import 't3_consent_screen.dart';

class T2VerifyOtpScreen extends StatefulWidget {
  final String phoneNumber;

  const T2VerifyOtpScreen({
    super.key,
    required this.phoneNumber,
  });

  @override
  State<T2VerifyOtpScreen> createState() => _T2VerifyOtpScreenState();
}

class _T2VerifyOtpScreenState extends State<T2VerifyOtpScreen> {
  static const int _otpLength = 6;
  final List<TextEditingController> _controllers =
      List.generate(_otpLength, (_) => TextEditingController());
  final List<FocusNode> _focusNodes =
      List.generate(_otpLength, (_) => FocusNode());

  Timer? _countdownTimer;
  int _secondsRemaining = 59;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    _countdownTimer?.cancel();
    setState(() => _secondsRemaining = 59);
    _countdownTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_secondsRemaining > 0) {
        setState(() => _secondsRemaining--);
      } else {
        timer.cancel();
      }
    });
  }

  @override
  void dispose() {
    _countdownTimer?.cancel();
    for (var c in _controllers) {
      c.dispose();
    }
    for (var f in _focusNodes) {
      f.dispose();
    }
    super.dispose();
  }

  String get _otpCode => _controllers.map((c) => c.text).join();

  String get _maskedPhone {
    final phone = widget.phoneNumber;
    if (phone.length >= 4) {
      return phone.substring(phone.length - 4);
    }
    return '4823';
  }

  void _handleVerify() async {
    final otp = _otpCode;
    if (otp.length < _otpLength) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Please enter the complete 6-digit OTP',
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
        builder: (context) => const T3ConsentScreen(),
      ),
    );
  }

  Widget _buildOtpBox(int index) {
    final bool isFocused = _focusNodes[index].hasFocus;
    final bool hasValue = _controllers[index].text.isNotEmpty;

    return Container(
      width: 48,
      height: 58,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: isFocused
              ? AppColors.primary
              : (hasValue ? AppColors.primary.withAlpha(180) : AppColors.border),
          width: isFocused ? 1.8 : 1.2,
        ),
        boxShadow: isFocused
            ? [
                BoxShadow(
                  color: AppColors.primary.withAlpha(30),
                  blurRadius: 10,
                  offset: const Offset(0, 3),
                ),
              ]
            : null,
      ),
      child: RawKeyboardListener(
        focusNode: FocusNode(),
        onKey: (event) {
          if (event is RawKeyDownEvent &&
              event.logicalKey == LogicalKeyboardKey.backspace &&
              _controllers[index].text.isEmpty &&
              index > 0) {
            _focusNodes[index - 1].requestFocus();
            _controllers[index - 1].clear();
          }
        },
        child: TextField(
          controller: _controllers[index],
          focusNode: _focusNodes[index],
          textAlign: TextAlign.center,
          keyboardType: TextInputType.number,
          inputFormatters: [
            FilteringTextInputFormatter.digitsOnly,
            LengthLimitingTextInputFormatter(1),
          ],
          style: GoogleFonts.plusJakartaSans(
            fontSize: 22,
            fontWeight: FontWeight.w700,
            color: AppColors.textPrimary,
          ),
          cursorColor: AppColors.primary,
          cursorHeight: 26,
          decoration: const InputDecoration(
            border: InputBorder.none,
            isDense: true,
            contentPadding: EdgeInsets.zero,
          ),
          onChanged: (value) {
            if (value.isNotEmpty) {
              if (index < _otpLength - 1) {
                _focusNodes[index + 1].requestFocus();
              } else {
                _focusNodes[index].unfocus();
                if (_otpCode.length == _otpLength) {
                  _handleVerify();
                }
              }
            }
          },
        ),
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

          SafeArea(
            child: Column(
              children: [
                // Top App Bar row with Back Button
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                  child: Row(
                    children: [
                      AppBackButton(
                        onPressed: () => Navigator.of(context).maybePop(),
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
                                    'Verify Your Number',
                                    textAlign: TextAlign.center,
                                    style: GoogleFonts.plusJakartaSans(
                                      fontSize: 27,
                                      fontWeight: FontWeight.w800,
                                      color: AppColors.textPrimary,
                                      letterSpacing: -0.5,
                                    ),
                                  ),

                                  const SizedBox(height: 10),

                                  // Subtitle with bold phone ending
                                  RichText(
                                    textAlign: TextAlign.center,
                                    text: TextSpan(
                                      style: GoogleFonts.plusJakartaSans(
                                        fontSize: 14.5,
                                        fontWeight: FontWeight.w400,
                                        color: AppColors.textSecondary,
                                        height: 1.45,
                                      ),
                                      children: [
                                        const TextSpan(
                                          text: 'We have sent a 6-digit OTP to your\nWhatsApp number ending with ',
                                        ),
                                        TextSpan(
                                          text: _maskedPhone,
                                          style: const TextStyle(
                                            fontWeight: FontWeight.w700,
                                            color: AppColors.textPrimary,
                                          ),
                                        ),
                                        const TextSpan(text: '.'),
                                      ],
                                    ),
                                  ),

                                  const SizedBox(height: 36),

                                  // 6-digit OTP Input Boxes
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: List.generate(
                                      _otpLength,
                                      (index) => _buildOtpBox(index),
                                    ),
                                  ),

                                  const SizedBox(height: 28),

                                  // Continue Button
                                  PrimaryButton(
                                    text: 'Continue',
                                    isLoading: _isLoading,
                                    showArrow: true,
                                    onPressed: _handleVerify,
                                  ),

                                  const SizedBox(height: 20),

                                  // Resend OTP countdown
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Text(
                                        'Resend OTP in ',
                                        style: GoogleFonts.plusJakartaSans(
                                          fontSize: 14,
                                          fontWeight: FontWeight.w500,
                                          color: AppColors.textSecondary,
                                        ),
                                      ),
                                      if (_secondsRemaining > 0)
                                        Text(
                                          '00:${_secondsRemaining.toString().padLeft(2, '0')}',
                                          style: GoogleFonts.plusJakartaSans(
                                            fontSize: 14,
                                            fontWeight: FontWeight.w700,
                                            color: AppColors.primary,
                                          ),
                                        )
                                      else
                                        GestureDetector(
                                          onTap: _startTimer,
                                          child: Text(
                                            'Resend Now',
                                            style: GoogleFonts.plusJakartaSans(
                                              fontSize: 14,
                                              fontWeight: FontWeight.w700,
                                              color: AppColors.primary,
                                              decoration: TextDecoration.underline,
                                            ),
                                          ),
                                        ),
                                    ],
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
