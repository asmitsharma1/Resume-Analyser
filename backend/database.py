from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://postgres.fedmhyyfcfzjolrzcjln:uk17Q4480%40%23@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()
