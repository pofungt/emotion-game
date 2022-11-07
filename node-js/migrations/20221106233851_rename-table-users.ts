import { Knex } from "knex";


export async function up(knex: Knex){

    await knex.schema.renameTable("users", "leaderboard")
    
}

export async function down(knex: Knex){
    
    await knex.schema.renameTable("leaderboard", "users")

}

