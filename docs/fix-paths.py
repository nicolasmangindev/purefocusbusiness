#!/usr/bin/env python3
"""
Script to fix absolute paths to relative paths for GitHub Pages deployment from /docs folder.
"""

import os
import re
from pathlib import Path

def fix_fr_files():
    """Fix paths in /fr/ directory files"""
    fr_dir = Path('fr')
    for html_file in fr_dir.glob('*.html'):
        print(f"Fixing {html_file}...")
        content = html_file.read_text(encoding='utf-8')

        # Replace absolute paths with relative paths
        content = content.replace('href="/assets/', 'href="../assets/')
        content = content.replace('src="/assets/', 'src="../assets/')
        content = content.replace('href="/fr/', 'href="./')
        content = content.replace('href="/en/', 'href="../en/')

        html_file.write_text(content, encoding='utf-8')

def fix_en_files():
    """Fix paths in /en/ directory files"""
    en_dir = Path('en')
    for html_file in en_dir.glob('*.html'):
        print(f"Fixing {html_file}...")
        content = html_file.read_text(encoding='utf-8')

        # Replace absolute paths with relative paths
        content = content.replace('href="/assets/', 'href="../assets/')
        content = content.replace('src="/assets/', 'src="../assets/')
        content = content.replace('href="/en/', 'href="./')
        content = content.replace('href="/fr/', 'href="../fr/')

        html_file.write_text(content, encoding='utf-8')

if __name__ == '__main__':
    os.chdir(os.path.dirname(__file__))
    print("Fixing paths for GitHub Pages deployment from /docs...")
    fix_fr_files()
    fix_en_files()
    print("Done! All paths have been fixed.")