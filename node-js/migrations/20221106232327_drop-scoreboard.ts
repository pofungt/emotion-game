import { Knex } from "knex";


export async function up(knex: Knex) {

    await knex.schema.dropTable("scoreboard")

}


export async function down(knex: Knex) {

    await knex.schema.createTable("scoreboard", (table) => {
        table.increments();
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references(`users.id`);
        table.integer("lv1_score");
        table.integer("lv2_score");
        table.integer("lv3_score");
        table.integer("lv4_score");
        table.integer("lv5_score");
        table.integer("Total_score")
        table.timestamps(false, true)
    })

}

