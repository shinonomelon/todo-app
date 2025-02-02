import { Metadata } from 'next';

import { TaskListView } from '../_components/task-list-view';

import { CustomSuspense } from '@/lib/utils/custom-suspense';

import { getTaskList } from '@/actions/api/task';

export const metadata: Metadata = {
  title: '今日'
};

export default async function Page() {
  const { data: tasks } = await getTaskList();

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">今日</h1>
      <CustomSuspense height={100} width="100%">
        <TaskListView tasks={tasks} filterByList={['overdue', 'today']} />
      </CustomSuspense>
    </>
  );
}
