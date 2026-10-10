import 'package:flutter/material.dart';

class TopBackgroundDecor extends StatelessWidget {
  const TopBackgroundDecor({super.key});

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: Stack(
        children: [
          // Outer top-left soft circle
          Positioned(
            top: -120,
            left: -120,
            child: Container(
              width: 360,
              height: 360,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFFF0F6FE).withAlpha(160),
              ),
            ),
          ),
          // Mid top-left soft ring
          Positioned(
            top: -70,
            left: -70,
            child: Container(
              width: 250,
              height: 250,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFFE2EEFD).withAlpha(190),
              ),
            ),
          ),
          // Inner top-left circle
          Positioned(
            top: -20,
            left: -20,
            child: Container(
              width: 150,
              height: 150,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFFD6E6FB).withAlpha(220),
              ),
            ),
          ),
          // Top-right soft orb
          Positioned(
            top: 90,
            right: -45,
            child: Container(
              width: 140,
              height: 140,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFFEAF2FD).withAlpha(220),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
