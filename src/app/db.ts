import Dexie, { type EntityTable } from "dexie";
import moment from "moment";
import { JobEntity } from "./entity/jobs.entity";

interface JobRecord {
  id: string;
  email: string;
  data: JobEntity;
}

interface UpdateRecord {
  email: string;
  last_modified: string;
}

const db = new Dexie(`jobs-store-${window.location.hostname}`) as Dexie & {
  jobs: EntityTable<
    JobRecord,
    "id" // primary key "id" (for the typings only)
  >;
  updates: EntityTable<
    UpdateRecord,
    "email" // primary key "email" (for the typings only)
  >;
};

const lastModified = (email: string): Promise<moment.Moment> => {
  return new Promise((resolve) => {
    db.updates.get(email).then((update) => {
      resolve(update ? moment(update.last_modified) : moment.unix(0));
    });
  });
};

const addJobs = (jobs: JobEntity[]) => {
  return jobs.length ? db.jobs.bulkPut(
    jobs.map((item: JobEntity) => ({
      id: `${item.useremail}/${item.id}`,
      email: item.useremail,
      data: item,
    }))
  ) : Promise.resolve();
};

const setLastModified = (data: JobEntity[]) => {
  return data.length ? db.updates.put({
    email: data[0].useremail,
    last_modified: moment
      .unix(
        Math.max(
          ...data.map((item: JobEntity) => moment(item.last_modified).unix())
        )
      )
      .toISOString(),
  }) : Promise.resolve();
};

const addJob = (job: JobEntity) => {
  return db.jobs.put({
    id: `${job.useremail}/${job.id}`,
    email: job.useremail,
    data: job,
  });
};

// Schema declaration:
db.version(1).stores({
  jobs: "id, email, data", // primary key "id" (for the runtime!)
  updates: "email, last_modified",
});

export type { JobRecord, UpdateRecord };
export { db, lastModified, addJobs, setLastModified, addJob };
