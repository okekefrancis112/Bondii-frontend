import Head from "next/head";
import Layout from "../Layout/Layout";
import { PurchaseModal } from "../components/PurchaseBond";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { Line } from "rc-progress";
import Tooltip from "react-simple-tooltip";
import { useContractFactoryStorageRead } from "../hooks/usePiggyFactoryRead";
import { TOKEN_ABI, OLYMPUS_PRO_FACTORY_STORAGE_ABI, OLYMPUS_PRO_FACTORY_STORAGE_CONTRACT_ADDRESS } from "../config";
import { useContractRead } from "wagmi";
import { resultArray } from "../utils/result";

export default function Home() {
  const [openPurchase, setOpenPurchase] = useState(false);

  const {
    data: bondDetails,
    isError,
    isLoading,
  } = useContractFactoryStorageRead("fetchBondDetails");


  console.log(resultArray);

  const [createBond, setCreateBond] = useState({})


  const handleOpenModal = (bondAddress, principalToken) => {
    setCreateBond({bondAddress, principalToken});
    setOpenPurchase(true);
  }

  console.log(createBond);

  return (
    <div className={""}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className={""}>
        {openPurchase && <PurchaseModal createBond={createBond} setOpenPurchase={setOpenPurchase} />}

        <div className="flex justify-center font-mono flex-col items-center mt-16 text-grey_light">
          <div className="flex text-4xl">
            {/* <i className="ri-quill-pen-line"></i> {" "} */}
            <img src="favicon-1.ico"width="40"/>
            <p className="font-medium">Bondii</p>
          </div>

          <p className="mt-2 text-2xl">
            Securing liquidity for protocols across DeFi
          </p>
        </div>

        <div className="font-mono bg-black_faint w-[72%] mx-auto rounded-lg my-8 p-9">
          <div>
            <div className="grid grid-cols-12 gap-4 text-grey_light mt-4 font-medium">
              <div className="col-span-3 flex items-center">
                <i className="ri-settings-2-line text-xl"></i>{" "}
                <p className="ml-1 text-lg">My Bonds</p>
              </div>
              <div className="col-span-3">Claimable</div>
              <div className="col-span-2 flex items-center">Pending</div>
              <div className="col-span-2 flex items-center">Vesting Time</div>
              <div className="col-span-2"></div>
            </div>

            {[1, 2].map((x, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-4 text-grey_light mt-4 font-medium my-8"
              >
                <div className="col-span-3 flex items-center">
                  {/* <Rune /> */}
                  {/* <ETH /> */}
                  <div className="">
                    {/* <h3 className="testing">XRUNE-ETH SLP</h3> */}
                    <h3 className="text-base bg-grey_dark px-2 py-1 rounded-md">
                      XRUNE-ETH SLP
                    </h3>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex">
                    <div className="mr-3">0.0</div>
                  </div>
                </div>
                <div className="col-span-2 flex items-center">
                  <div className="text-lg font-medium">22206.06</div>
                </div>
                <div className="col-span-2">
                  <div className="text-lg font-medium mb-1">
                    7d {""} 0m {""} 43s
                  </div>
                  {/* <Line
                    percent={10}
                    strokeWidth={3}
                    trailWidth={3}
                    trailColor={"#030A2B"}
                    strokeColor="#fff"
                  /> */}
                </div>
                <div className="col-span-2 flex justify-end items-center">
                  <div
                    className="border cursor-pointer border-pink inline-block w-9/12 py-1 rounded-md text-center hover:bg-pink font-semibold"
                    onClick={() => {
                      setOpenPurchase(!openPurchase);
                    }}
                  >
                    Claim
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="font-mono bg-black_faint w-[72%] mx-auto rounded-lg my-8 p-14">
          <p className="text-2xl text-center text-grey_light">
            Total Liquidity Bonded
          </p>
          <div className="text-grey_light text-4xl font-semibold text-center mt-2">
            $20,000,000
          </div>

          <div className="flex justify-end my-5">
            <div className="form-input relative ">
              <BiSearchAlt2
                size={"26px"}
                className="text-grey_light icon-search top-2 left-2 absolute"
              />

              <input
                type={"text"}
                className="pr-40 pl-10 text-grey_light text-lg py-2 w-96 rounded-md bg-blue_dark"
                placeholder="Search"
              />

              <div className="px-2 py-1 rounded-xl text-grey_light font-medium absolute right-2 top-2 border border-grey inline-block">
                Showing All ({resultArray.length})
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 gap-4 text-grey_light mt-4 font-medium">
              <div className="col-span-3 flex items-center">
                <i className="ri-settings-2-line text-xl"></i>{" "}
                <p className="ml-1 text-lg">Bonds</p>
              </div>
              <div className="col-span-3">Payout Assets</div>
              <div className="col-span-2 flex items-center">
                Discount
                <Tooltip
                  style={{ width: "500px" }}
                  content="A positive discount bond rate means you get more tokens for the same amount of capital; at a negative rate, or premium, you get fewer. Bonds will sometimes be priced at a premium when demand is high, but purchasing a bond at a premium is not typically recommended."
                >
                  <i className="ri-information-line ml-1"></i>
                </Tooltip>
              </div>
              <div className="col-span-2 flex items-center">
                TBV{" "}
                <Tooltip content="Total Bonded Value is the total amount of payout assets sold to the bonders. It also represent the liquidity accrued by the protocol. A high bonded value implies that the payout asset is actively sought after by other bonders.">
                  <i className="ri-information-line ml-1"></i>
                </Tooltip>
              </div>
              <div className="col-span-2"></div>
            </div>

            {Array.isArray(resultArray) &&
              resultArray.map((bond, i) => {

                return (
                  <div
                    key={i}
                    className="grid grid-cols-12 gap-4 text-grey_light mt-4 font-medium my-8"
                  >
                    <div className="col-span-3 flex items-center">
                      <div className="">
                        <h3 className="text-base bg-grey_dark px-2 py-1 rounded-md">
                          {bond._principalToken.name}
                        </h3>
                        <p className="font-thin text-xs flex items-center mt-1 text-white">
                          Get LP <i className="ri-share-box-fill ml-1"></i>
                        </p>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="">
                        <h3 className="text-base">
                          ${bond._payoutToken.name}
                        </h3>
                        <p className="font-thin text-xs flex items-center  x1text-white">
                          $0.0117 Market
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <div className="text-lg font-medium">{bond._discount}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-lg font-medium mb-1">
                        ${0}
                      </div>
                      <Line
                        percent={10}
                        strokeWidth={3}
                        trailWidth={3}
                        trailColor={"#030A2B"}
                        strokeColor="#fff"
                      />
                    </div>
                    <div className="col-span-2 flex justify-end items-center">
                      <div
                        className="border cursor-pointer border-pink inline-block w-9/12 py-1 rounded-md text-center hover:bg-pink font-semibold"
                        onClick={() => {
                          handleOpenModal(bond._bondAddress, bond._principalToken.address)
                          // setOpenPurchase(!openPurchase);
                        }}
                      >
                        Bond
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="mb-32">
          <div className="font-mono bg-black_faint w-[72%] mx-auto rounded-lg my-8 p-9">
            <div>
              <div className="grid grid-cols-3 gap-8 text-grey_light mt-4 font-medium">
                <div className="col-span-1">
                  <h5 className="mb-3 font-semibold text-md">
                    Exchange your LP
                  </h5>
                  <p>
                    Exchange available LP tokens for governance tokens at below
                    market rate Bonds.
                  </p>

                  <div className="flex flex-col items-center justify-center mt-5">
                    <i className="ri-time-line text-2xl"></i>
                    <p className="text-grey text-semibold">You Give</p>
                  </div>
                </div>

                <div className="col-span-1">
                  <h5 className="mb-3 font-semibold text-md">Linear Vesting</h5>
                  <p>
                    Once you receive a Bond, you are able to vest at any time
                    within the vesting period.
                  </p>

                  <div className="flex flex-col items-center justify-center mt-5">
                    <i className="ri-time-line text-2xl"></i>
                    <p className="text-grey text-semibold">
                      Vested over 7 days
                    </p>
                  </div>
                </div>

                <div className="col-span-1">
                  <h5 className="mb-3 font-semibold text-md">
                    Below-market-rate discount
                  </h5>
                  <p>
                    To receive a below market rate swap, find your desired Bond
                    with a positive discount rate.
                  </p>

                  <div className="flex flex-col items-center justify-center mt-5">
                    <i className="ri-time-line text-2xl"></i>
                    <p className="text-grey text-semibold">You Get</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
