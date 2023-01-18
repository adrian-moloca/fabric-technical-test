import { FC } from "react";
import { IFilter, alphaSort, typeFilter, yearSort } from "../../../../utils/interfaces";
import { Box, Toolbar, Typography, useTheme } from "@mui/material";
import SelectMenu from "../../../select-menu";
import { filterOptions } from "../../../../utils/costants";

export interface IProps {
    filtersSelected: IFilter;
    setFilterSelected: (filterObject: IFilter) => void;
    numberOfItems: number;
}

const FilterBar: FC<IProps> = (props: IProps) => {
    const theme = useTheme();
    const { filtersSelected, setFilterSelected, numberOfItems } = props;

    const handleSelectSortByAlpha = (el: string) => {
        const newFil = el as alphaSort;
        setFilterSelected({ type: filtersSelected?.type, titleSort: newFil });
    };

    const handleSelectSortByYear = (el: string) => {
        const newFil = el as yearSort;
        setFilterSelected({ type: filtersSelected?.type, yearSort: newFil });
    };

    const handleSelectSortByType = (el: string) => {
        const newFil = el as typeFilter;
        setFilterSelected({
            type: newFil,
            yearSort: filtersSelected?.yearSort,
            titleSort: filtersSelected?.titleSort,
        });
    };

    return (
        <>
            <Toolbar
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: theme.shadows[3],
                    borderRadius: theme.shape.borderRadius,
                    marginBottom: 2
                }}
            >
                <Box
                    display={"flex"}
                    width={"100%"}
                    flexDirection={{xs: 'column', md: 'row'}}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Typography color={theme.palette.common.white}>
                        Filter options:
                    </Typography>
                    <SelectMenu
                        name={"sort-by-alpha"}
                        label={"by alpha"}
                        current={filtersSelected?.titleSort || "----"}
                        setCurrent={handleSelectSortByAlpha}
                        menuItems={[filterOptions.ascendant, filterOptions.descendant]}
                    />
                    <SelectMenu
                        name={"sort-by-year"}
                        label={"by year"}
                        current={filtersSelected?.yearSort || "----------"}
                        setCurrent={handleSelectSortByYear}
                        menuItems={[filterOptions.increase, filterOptions.decrease]}
                    />
                    <SelectMenu
                        name={"sort-by-type"}
                        label={"by type"}
                        current={filtersSelected?.type}
                        setCurrent={handleSelectSortByType}
                        menuItems={[filterOptions.all, filterOptions.movie, filterOptions.game]}
                    />
                    <Typography color={theme.palette.common.white} pl={{xs: 0, sm: 2}}>
                        {numberOfItems} items
                    </Typography>
                </Box>
            </Toolbar>
        </>
    );
};

export default FilterBar;
