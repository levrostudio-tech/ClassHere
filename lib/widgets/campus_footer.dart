import 'package:flutter/material.dart';

class CampusFooter extends StatelessWidget {
  const CampusFooter({super.key});

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: SizedBox(
        width: double.infinity,
        child: Image.asset(
          'assets/images/campus_illustration_high.png',
          width: double.infinity,
          fit: BoxFit.fitWidth,
          alignment: Alignment.bottomCenter,
          errorBuilder: (context, error, stackTrace) {
            return Image.asset(
              'assets/images/campus_illustration.png',
              width: double.infinity,
              fit: BoxFit.fitWidth,
              alignment: Alignment.bottomCenter,
            );
          },
        ),
      ),
    );
  }
}
