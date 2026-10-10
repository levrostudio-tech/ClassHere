import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_colors.dart';

class BrandLogo extends StatelessWidget {
  final double iconSize;
  final double fontSize;
  final bool showIcon;

  const BrandLogo({
    super.key,
    this.iconSize = 84,
    this.fontSize = 32,
    this.showIcon = true,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (showIcon) ...[
          Container(
            width: iconSize,
            height: iconSize,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(22),
              boxShadow: [
                BoxShadow(
                  color: AppColors.primary.withAlpha(40),
                  blurRadius: 20,
                  offset: const Offset(0, 8),
                ),
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(22),
              child: Image.asset(
                'assets/images/logo_icon.png',
                fit: BoxFit.contain,
                errorBuilder: (context, error, stackTrace) {
                  return Container(
                    decoration: BoxDecoration(
                      color: AppColors.primary,
                      borderRadius: BorderRadius.circular(22),
                    ),
                    child: const Icon(
                      Icons.school_rounded,
                      color: Colors.white,
                      size: 46,
                    ),
                  );
                },
              ),
            ),
          ),
          const SizedBox(height: 14),
        ],
        RichText(
          text: TextSpan(
            style: GoogleFonts.plusJakartaSans(
              fontSize: fontSize,
              fontWeight: FontWeight.w800,
              letterSpacing: -0.6,
            ),
            children: const [
              TextSpan(
                text: 'Class',
                style: TextStyle(
                  color: AppColors.textPrimary,
                ),
              ),
              TextSpan(
                text: 'Here',
                style: TextStyle(
                  color: AppColors.primary,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
