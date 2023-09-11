import * as SQLite from "expo-sqlite";

interface Job {
  job_id: string;
  employer_name: string;
  employer_logo: string;
  job_title: string;
}

class DB {
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabase("db.db");
    this.init();
  }

  public async init() {
    const result = await this.executeQueryAsync<Job>(
      `CREATE TABLE IF NOT EXISTS jobs (job_id TEXT NOT NULL PRIMARY KEY, job_title TEXT NOT NULL, employer_name TEXT NOT NULL, employer_logo TEXT);`
    );
  }

  public async clearDb() {
    const result = await this.executeQueryAsync<Job>(
      `DROP TABLE IF EXISTS jobs;`
    );
  }

  public async addJob(job: Job) {
    const result = await this.executeQueryAsync<Job>(
      `INSERT INTO jobs (job_id, job_title, employer_name, employer_logo) VALUES (?, ?, ?, ?);`,
      [job.job_id, job.job_title, job.employer_name, job.employer_logo]
    );
    return result;
  }

  public async getJob(job_id: string) {
    const result = await this.executeQueryAsync<Job>(
      `SELECT * FROM jobs WHERE job_id = ?;`,
      [job_id]
    );
    return result;
  }

  public async getAllJobs() {
    const result = await this.executeQueryAsync<Job>(`SELECT * FROM jobs;`);
    return result;
  }

  public async deleteJob(job_id: string) {
    const result = await this.executeQueryAsync<Job>(
      `DELETE FROM jobs WHERE job_id = ?;`,
      [job_id]
    );
    return result;
  }

  private async executeQueryAsync<TableType>(
    query: string,
    params: any[] = []
  ): Promise<SQLite.SQLResultSet & { data: TableType[] }> {
    try {
      return await this.executeQuery<TableType>(query, params);
    } catch (e) {
      console.log(e);
      throw new Error("SQL query failed");
    }
  }

  private executeQuery<TableType>(
    query: string,
    params: any[] = []
  ): Promise<SQLite.SQLResultSet & { data: TableType[] }> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          query,
          params,
          (_, obj) => {
            const data = obj.rows._array;

            resolve({ ...obj, data });
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      });
    });
  }
}

const globalForDb = global as unknown as { db: DB };

if (!globalForDb.db) {
  console.log("initializing global db");
  globalForDb.db = new DB();
}

export default globalForDb.db;

if (process.env.NODE_ENV !== "production") globalForDb.db = new DB();
