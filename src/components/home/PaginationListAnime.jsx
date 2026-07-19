import { Button, Flex, NumberInput } from "@chakra-ui/react";

const PaginationListAnime = ({
  loading,
  data,
  currPage,
  page,
  setPage,
  newPage,
  setNewPage,
}) => {
  const setNewParamPage = (newParamPage) => {
    page.set("page", newParamPage);
    setPage(page);
  };

  return (
    <>
      {!loading && (
        <>
          <Flex justifyContent="center" gap={10}>
            {data?.currentPage !== 1 && (
              <Button
                onClick={() => {
                  setNewParamPage(currPage - 1);
                }}
                variant="outline"
              >
                Previous
              </Button>
            )}

            <NumberInput.Root
              min={1}
              width={100}
              defaultValue={String(currPage || 1)}
              onValueChange={({ value }) => {
                if (/^[0-9]+$/.test(value)) {
                  setNewPage(Number(value) > 0 ? value : 1);
                }
              }}
              onKeyUp={(e) => {
                if (e?.code?.toLowerCase() === "enter") {
                  setNewParamPage(newPage);
                }
              }}
            >
              <NumberInput.Input textAlign="center" />
            </NumberInput.Root>

            {data?.hasNextPage && (
              <Button
                onClick={() => {
                  let newPageValue = 0;
                  if (currPage) {
                    newPageValue = Number(currPage) + 1;
                  } else {
                    newPageValue = 2;
                  }

                  setNewParamPage(newPageValue);
                }}
              >
                Next
              </Button>
            )}
          </Flex>
        </>
      )}
    </>
  );
};
export default PaginationListAnime;
