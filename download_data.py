import urllib.request, json
url_chapters = 'https://raw.githubusercontent.com/praneshp1org/Bhagavad-Gita-JSON-data/main/chapters.json'
url_verses = 'https://raw.githubusercontent.com/praneshp1org/Bhagavad-Gita-JSON-data/main/verse.json'
url_translations = 'https://raw.githubusercontent.com/praneshp1org/Bhagavad-Gita-JSON-data/main/translation.json'

chaps = json.loads(urllib.request.urlopen(url_chapters).read())
vers = json.loads(urllib.request.urlopen(url_verses).read())
trans = json.loads(urllib.request.urlopen(url_translations).read())

# Map chapters
out_chapters = []
for c in chaps:
    out_chapters.append({
        'id': c['id'],
        'chapter_number': c['chapter_number'],
        'chapter_summary': c.get('chapter_summary', ''),
        'chapter_summary_hindi': c.get('chapter_summary_hindi', ''),
        'name': c['name'],
        'name_meaning': c.get('name_meaning', ''),
        'name_translation': c.get('name_translation', ''),
        'verses_count': c.get('verses_count', 0)
    })

# Map verses
out_verses = []
# Group translations
t_map = {}
for t in trans:
    v_id = t['verse_id']
    if v_id not in t_map:
        t_map[v_id] = []
    t_map[v_id].append({
        'id': t['id'],
        'description': t['description'],
        'authorName': t['authorName'],
        'language': t.get('lang', 'english')
    })

for v in vers:
    vid = v['id']
    ts = t_map.get(vid, [])
    chap_num = v.get('chapter_number', 0)
    verse_num = v.get('verse_number', 0)
    out_verses.append({
        'id': vid,
        'verse_number': verse_num,
        'chapter_number': chap_num,
        'slug': v.get('slug', f'chapter-{chap_num}-verse-{verse_num}'),
        'text': v.get('text', ''),
        'transliteration': v.get('transliteration', ''),
        'word_meanings': v.get('word_meanings', ''),
        'translations': ts,
        'commentaries': [] # The repo might not have commentaries in translation file
    })

with open('src/lib/api/mockData.ts', 'w', encoding='utf-8') as f:
    f.write('import { Chapter, Verse } from "./types";\n\n')
    f.write('export const mockChapters: Chapter[] = ')
    json.dump(out_chapters, f, indent=2, ensure_ascii=False)
    f.write(';\n\n')
    f.write('export const mockVerses: Verse[] = ')
    json.dump(out_verses, f, indent=2, ensure_ascii=False)
    f.write(';\n')

print('Wrote mockData.ts successfully!')
