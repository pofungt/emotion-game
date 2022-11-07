import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.table('users',(table)=>{
        table.integer("score");
    })

}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.table('users',(table)=>{
        table.dropColumn("score");
    })

}

