import {DataSourceBuilder} from '@subsquid/evm-stream'
import {augmentBlock} from '@subsquid/evm-objects'
import {run} from '@subsquid/batch-processor'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import * as usdcAbi from './abi/usdc'
import {UsdcTransfer} from './model'

//const USDC_CONTRACT_ADDRESS =
//  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

const dataSource = new DataSourceBuilder()
  .setPortal(
{
  url: 'https://portal.sqd.dev/datasets/polygon-mainnet',
  minBytes: 10_485_760,   // 10MB
  maxBytes: 52_428_800,   // 50MB
  maxWaitTime: 30_000,    // 30s
  maxIdleTime: 30_000,    // 30s
  headPollInterval: 1_000 // 1s
}
  )
  .addLog({})
/*  .setFields({
    log: {
      transactionHash: true,
    },
  })*/
  .build()

const db = new TypeormDatabase({supportHotBlocks: true})

run(dataSource, db, async (ctx) => {
  console.log(`Got ${ctx.blocks.length} blocks`)
})
