'use client'

import { useState } from 'react'
import Table from '@/components/ui/Table'
import { Subject } from '@prisma/client'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Modal from '@/components/ui/Modal'
import { deleteSubject } from '@/lib/actions/subject'
import toast, { Toaster } from 'react-hot-toast'
import { SUBJECT_AREAS } from '@/config/subject'

export default function SubjectTable({
  path,
  subjects,
}: {
  path: string
  subjects: Subject[]
}) {
  // State
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

  //

  async function handleSubjectDelete(subject: Subject) {
    //
    setIsLoading(true)

    try {
      const resDelete = await deleteSubject(subject.id)

      if (resDelete.success) {
        //
        toast.success('Subject deleted successfully!')

        // Wait 1000
        setTimeout(() => {
          setShowModal(false)
          selectedSubject && setSelectedSubject(null)
        }, 1000)
      }
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table
          className="mb-5 rounded-xl"
          data={subjects.map((subject: Subject) => ({
            ...subject,
            level: subject.level.toLowerCase(),
            difficulty: subject.difficulty.toLowerCase(),
            category: subject.category.toLowerCase(),
            area: SUBJECT_AREAS.find((area) => area.value === subject.area)
              ?.label,
            action: (
              <SubjectAction
                path={path}
                subject={subject}
                setShowModal={setShowModal}
                setSelectedSubject={setSelectedSubject}
              />
            ),
          }))}
          columns={[
            {
              Header: 'Subject code',
              accessor: 'code',
            },
            {
              Header: 'Subject name',
              accessor: 'name',
            },
            {
              Header: 'Level',
              accessor: 'level',
              className: 'capitalize',
            },
            {
              Header: 'Difficulty',
              accessor: 'difficulty',
              className: 'capitalize',
            },
            {
              Header: 'Category',
              accessor: 'category',
              className: 'capitalize',
            },
            {
              Header: 'Area',
              accessor: 'area',
              className: 'capitalize',
            },
            {
              Header: '',
              accessor: 'action',
              dataType: 'component',
              className: 'flex justify-end',
            },
          ]}
        />
      </div>
      {showModal && (
        <Modal
          title={`Delete ${selectedSubject?.name}?`}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <div className="flex flex-col gap-5">
            <p>Are you sure you want to delete this subject?</p>
            <div className="flex gap-5">
              <button
                className={`button button--danger ${
                  isLoading ? ' animate-pulse' : ''
                }`}
                onClick={() => handleSubjectDelete(selectedSubject)}
                disabled={isLoading}
              >
                {isLoading ? `Deleting...` : `Delete`}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="button button--default"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
      <Toaster position="bottom-right" />
    </>
  )
}

function SubjectAction({
  path,
  subject,
  setShowModal,
  setSelectedSubject,
}: {
  path
  subject: Subject
  setShowModal: (showModal: boolean) => void
  setSelectedSubject: (subject: Subject) => void
}) {
  return (
    <div className="flex space-x-4 justify-end ">
      {/* Edit */}
      <Link
        href={`${path}/dashboard/subject/${subject.id}/edit`}
        className="button button--circle hover:bg-secondary"
      >
        <Edit className="w-5 h-5" />
      </Link>

      <button
        onClick={() => {
          setShowModal(true)
          setSelectedSubject(subject)
        }}
        className="button button--circle hover:bg-secondary"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}
