from database import engine

try:
    conn = engine.connect()
    print("✅ Supabase DB Connected")
    conn.close()
except Exception as e:
    print("❌ Error:", e)
