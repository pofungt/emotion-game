import { Knex } from "knex";

const userTableName = "users"
const scoreboardTableName = "scoreboard"

export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable(userTableName, (table) => {
        table.increments();
        table.string("username").unique().notNullable();
        table.string("profile_pic");
        table.timestamps(false, true);
    })

    await knex.schema.createTable(scoreboardTableName, (table) => {
        table.increments();
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references(`${userTableName}.id`);
        table.integer("lv1_score");
        table.integer("lv2_score");
        table.integer("lv3_score");
        table.integer("lv4_score");
        table.integer("lv5_score");
        table.integer("Total_score")
        table.timestamps(false, true)
    })
}

export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTableIfExists(scoreboardTableName)
    await knex.schema.dropTableIfExists(userTableName)

}

