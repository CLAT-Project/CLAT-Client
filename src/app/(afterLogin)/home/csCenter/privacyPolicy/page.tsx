'use client'

import { useState } from 'react'
import NavigationBar from '@/components/home/navigationBar'

const privacyPolicyPage = () => {
  return (
    <div className="flex h-screen space-x-4">
      <NavigationBar />

      <main className="h-4/5 flex-1 overflow-y-auto rounded-lg border border-black p-6">
        <h1 className="border-7B7B7B mb-8 border-b-2 p-4 text-2xl font-bold">
          개인정보 처리 방침
        </h1>

        <h3 className="font-bold">개인정보 처리 방침 안내</h3>
        <div className="space-y-4">
          <p>
            국군의 조직과 편성은 법률로 정한다. 국가유공자·상이군경 및
            전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로 근로의
            기회를 부여받는다. 대법원에 대법관을 둔다. 다만, 법률이 정하는 바에
            의하여 대법관이 아닌 법관을 둘 수 있다. 근로조건의 기준은 인간의
            존엄성을 보장하도록 법률로 정한다.
          </p>
          &nbsp;
          <p>
            국가안전보장에 관련되는 대외정책·군사정책과 국내정책의 수립에 관하여
            국무회의의 심의에 앞서 대통령의 자문에 응하기 위하여
            국가안전보장회의를 둔다. 농업생산성의 제고와 농지의 합리적인 이용을
            위하거나 불가피한 사정으로 발생하는 농지의 임대차와 위탁경영은
            법률이 정하는 바에 의하여 인정된다.
          </p>
        </div>
      </main>
    </div>
  )
}

export default privacyPolicyPage
