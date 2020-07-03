CREATE TABLE "public"."record_tracking"("id" serial NOT NULL, "json_data" jsonb NOT NULL, "hash_result" text, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "user_reference" integer NOT NULL, "project_id" integer NOT NULL, PRIMARY KEY ("id") );
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_record_tracking_updated_at"
BEFORE UPDATE ON "public"."record_tracking"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_record_tracking_updated_at" ON "public"."record_tracking" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
